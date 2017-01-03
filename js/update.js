
function update() {
    // Physics is hard.
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, npcs);

    game.physics.arcade.collide(fruits, platforms);
    game.physics.arcade.overlap(player, fruits, collectFruit, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    // Handle character movement.
    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
        player.game.camera.focusOnXY(player.x, player.y-200) 
    }  else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
        player.game.camera.focusOnXY(player.x, player.y-200) 
    } else {
        player.animations.stop();
        player.frame = 4;
        player.game.camera.focusOnXY(player.x, player.y-200) 
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
        player.game.camera.focusOnXY(player.x, player.y-200) 
    }
}