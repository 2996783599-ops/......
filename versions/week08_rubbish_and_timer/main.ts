namespace SpriteKind {
    export const Rubbish = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Rubbish, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
})
let rubbish: Sprite = null
scene.setBackgroundColor(9)
let boat = sprites.create(img`
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . . 1 1 8 8 1 1 . . . . . 
    . . . . . 1 8 8 8 8 1 . . . . . 
    . . . . 1 1 8 8 8 8 1 1 . . . . 
    . . . . 1 8 8 1 1 8 8 1 . . . . 
    . . . . 1 8 8 1 1 8 8 1 . . . . 
    . . . . 1 8 8 8 8 8 8 1 . . . . 
    . . . . 1 8 8 8 8 8 8 1 . . . . 
    . . . . 1 8 e e e e 8 1 . . . . 
    . . . . 1 8 e 7 7 e 8 1 . . . . 
    . . . . 1 8 e 7 7 e 8 1 . . . . 
    . . . . 1 8 e e e e 8 1 . . . . 
    . . . . 1 8 8 8 8 8 8 1 . . . . 
    . . . . 1 1 1 1 1 1 1 1 . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(boat)
info.startCountdown(90)
game.onUpdateInterval(2000, function () {
    rubbish = sprites.create(img`
        . . . . . . . . . . . . . . . . 
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
        `, SpriteKind.Rubbish)
    rubbish.setPosition(randint(10, 150), randint(20, 110))
})
