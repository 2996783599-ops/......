namespace SpriteKind {
    export const Rubbish = SpriteKind.create()
    export const Turtle = SpriteKind.create()
    export const Coral = SpriteKind.create()
}
/**
 * Tide Turners - clean the reef in 90 seconds without hurting it.
 */
/**
 * Made in Microsoft MakeCode Arcade. I built it in Blocks and checked it in the JavaScript view.
 */
/**
 * All code is mine. Where an idea came from a tutorial or the docs, the comment says so.
 */
/**
 * SpriteKind: I made three new kinds (Rubbish, Turtle, Coral) so the game can tell them apart.
 */
// When the boat touches rubbish: the rubbish goes, I get 1 point and the water is checked.
// Overlap event idea from the Chase the Pizza tutorial (Microsoft, n.d.).
sprites.onOverlap(SpriteKind.Player, SpriteKind.Rubbish, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.bubbles, 200)
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    updateWater()
})
// Time is up: the game ends as a win and shows the score.
info.onCountdownEnd(function () {
    game.gameOver(true)
})
// No lives left: the game ends as a loss.
info.onLifeZero(function () {
    game.gameOver(false)
})
// A turtle starts on the left side and swims to the right at a random speed.
function spawnTurtle () {
    turtle = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 7 7 7 7 7 . . . . . . 
        . . . . 7 6 7 6 7 6 7 . . . . . 
        . . 7 7 6 7 6 7 6 7 6 7 7 7 . . 
        . 7 7 7 7 6 7 6 7 6 7 7 7 f 7 . 
        . . . 7 6 7 6 7 6 7 6 7 7 7 7 . 
        . . . . 7 6 7 6 7 6 7 . . . . . 
        . . . 7 7 . . . . . 7 7 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Turtle)
    turtle.setPosition(0, randint(15, 55))
    turtle.vx = randint(20, 40)
    // It is deleted when it leaves the screen, so turtles do not pile up.
    turtle.setFlag(SpriteFlag.AutoDestroy, true)
}
// Makes one piece of rubbish at a random place. The picture is picked at random from my list.
function spawnRubbish () {
    rubbish = sprites.create(rubbishPictures._pickRandom(), SpriteKind.Rubbish)
    rubbish.setPosition(randint(10, 150), randint(15, 95))
    // If nobody picks it up in 7 seconds it sinks and is gone.
    rubbish.lifespan = 7000
}
// Week 10 change after testing: a classmate said they did not look at the score,
// so the water colour shows it. Brown = dirty, green = getting better, light blue = clean.
function updateWater () {
    if (info.score() >= 20) {
        scene.setBackgroundColor(9)
    } else if (info.score() >= 10) {
        scene.setBackgroundColor(6)
    } else {
        scene.setBackgroundColor(14)
    }
}
// Week 9 bug fix: this event runs every frame while the boat is touching something,
// so one hit took all 3 lives. Moving the boat away makes the touching stop.
function sendBoatHome () {
    boat.setPosition(80, 108)
    scene.cameraShake(4, 300)
}
// Hitting a turtle costs a life. The turtle is not hurt, the boat is sent back.
sprites.onOverlap(SpriteKind.Player, SpriteKind.Turtle, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sendBoatHome()
})
// Hitting coral also costs a life.
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coral, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sendBoatHome()
})
let rubbish: Sprite = null
let turtle: Sprite = null
let coral: Sprite = null
let boat: Sprite = null
let rubbishPictures: Image[] = []
// The water starts brown because the reef is dirty.
scene.setBackgroundColor(14)
// My list of three rubbish pictures: bottle, bag, can.
rubbishPictures = [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . 1 d d d d 1 . . . . . 
    . . . . . 1 d d d d 1 . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . 1 . . . . 1 . . . . . 
    . . . . 1 . 1 . . 1 . 1 . . . . 
    . . . . 1 . 1 . . 1 . 1 . . . . 
    . . . . 1 1 1 1 1 1 1 1 . . . . 
    . . . 1 d 1 1 1 1 1 1 d 1 . . . 
    . . . 1 1 d 1 1 1 1 d 1 1 . . . 
    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
    . . . 1 1 1 d 1 1 d 1 1 1 . . . 
    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
    . . . . 1 1 1 1 1 1 1 1 . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . b b b b b b . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 2 1 1 1 1 2 . . . . . 
    . . . . . 2 1 2 2 1 2 . . . . . 
    . . . . . 2 1 2 2 1 2 . . . . . 
    . . . . . 2 1 1 1 1 2 . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . b b b b b b . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
// The boat is the player. Arrow keys move it, and it cannot leave the screen.
boat = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . 1 . . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . . 1 1 1 . . . . . . 
    . . . . . . . 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . e e e e e e e e e e e e e e . 
    . e 4 4 4 4 4 4 4 4 4 4 4 4 e . 
    . . e 4 4 4 4 4 4 4 4 4 4 e . . 
    . . . e e e e e e e e e e . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
// controller.moveSprite links the arrow keys to the boat (Microsoft, n.d.).
controller.moveSprite(boat, 70, 70)
boat.setStayInScreen(true)
boat.setPosition(80, 108)
// Four pieces of coral in a row. The loop runs 4 times: index is 0, 1, 2, 3.
for (let index = 0; index <= 3; index++) {
    coral = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 3 . . . . . 3 . . . . . 
        . . . . 3 . . 3 . . 3 . . . . . 
        . . 3 . 3 . . 3 . 3 3 . 3 . . . 
        . . 3 3 3 . 3 3 . 3 . . 3 . . . 
        . . . 3 3 3 3 . . 3 3 3 3 . . . 
        . . . . 3 3 3 . 3 3 3 . . . . . 
        . . . . . 3 3 3 3 3 . . . . . . 
        . . . . . . 3 3 3 . . . . . . . 
        . . . . . . 3 3 . . . . . . . . 
        . . . . . 3 3 3 3 . . . . . . . 
        . . . . 3 3 3 3 3 3 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Coral)
    // 20, 60, 100, 140: a gap of 40 pixels, with room for the boat in the middle.
    coral.setPosition(20 + index * 40, 82)
}
info.setScore(0)
info.setLife(3)
// 90 seconds, like in my A1 pitch.
info.startCountdown(90)
// Every 4 seconds a new turtle swims in.
game.onUpdateInterval(4000, function () {
    spawnTurtle()
})
// Every 1.5 seconds a new piece of rubbish appears.
game.onUpdateInterval(1500, function () {
    spawnRubbish()
})
