// Tide Turners - WEEK 7 VERSION: the boat moves on one screen. Nothing else yet.
scene.setBackgroundColor(9)
// The boat is the player.
let boat = sprites.create(img`
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
// Arrow keys move the boat (Microsoft, n.d.).
controller.moveSprite(boat)
