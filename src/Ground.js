var Ground = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'ground', frame);

  // enable physics on the ground sprite
  // this is needed for collision detection
  game.physics.enable(this)
  
  // we don't want the ground's body
  // to be affected by gravity
  this.body.immovable = true;
  this.body.allowGravity = false;
}

Ground.prototype = Object.create(Phaser.Sprite.prototype);
Ground.constructor = Ground;

module.exports = Ground;
