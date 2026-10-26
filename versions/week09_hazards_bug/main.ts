// Tide Turners - WEEK 9 VERSION (kept to show the bug I found).
// Turtles, coral and lives are new this week. Hitting coral takes all 3 lives at once.
// New kinds of sprite, so the game can tell rubbish, turtles and coral apart.
namespace SpriteKind {
    export const Rubbish = SpriteKind.create()
    export const Turtle = SpriteKind.create()
    export const Coral = SpriteKind.create()
}
// When the boat touches rubbish: the rubbish goes, I get 1 point and the water is checked.
// Overlap event idea from the Chase the Pizza tutorial (Microsoft, n.d.).
sprites.onOverlap(SpriteKind.Player, SpriteKind.Rubbish, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.bubbles, 200)
    info.changeScoreBy(1)
})
// Hitting a turtle costs a life. The turtle is not hurt, the boat is sent back.
sprites.onOverlap(SpriteKind.Player, SpriteKind.Turtle, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
// Hitting coral also costs a life.
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coral, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
// Makes one bottle at a random place.
function spawnRubbish () {
    rubbish = sprites.create(bottlePicture, SpriteKind.Rubbish)
    rubbish.setPosition(randint(10, 150), randint(15, 95))
}
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
    turtle.vx = randint(30, 60)
    // It is deleted when it leaves the screen, so turtles do not pile up.
    turtle.setFlag(SpriteFlag.AutoDestroy, true)
}
// Time is up: the game ends as a win and shows the score.
info.onCountdownEnd(function () {
    game.gameOver(true)
})
// ---------- on start: this part runs once ----------
let turtle: Sprite = null
let rubbish: Sprite = null
let coral: Sprite = null
let boat: Sprite = null
let bottlePicture: Image = null
scene.setBackgroundColor(9)
bottlePicture = img`
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
    `
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
// Every 2 seconds a new piece of rubbish appears.
game.onUpdateInterval(2000, function () {
    spawnRubbish()
})
// Every 4 seconds a new turtle swims in.
game.onUpdateInterval(4000, function () {
    spawnTurtle()
})
