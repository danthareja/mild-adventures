class Ground extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, 'ground', frame);

    // enable physics on the ground sprite
    // this is needed for collision detection
    game.physics.enable(this)
    
    // we don't want the ground's body
    // to be affected by gravity
    this.body.immovable = true;
    this.body.allowGravity = false;
  }
}

export default Ground;
