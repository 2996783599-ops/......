// Tide Turners - WEEK 7 VERSION: the boat moves on one screen. Nothing else yet.
scene.setBackgroundColor(9)
// The boat is the player.
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
// Arrow keys move the boat (Microsoft, n.d.).
controller.moveSprite(boat)
