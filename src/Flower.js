var Flower = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'closed_flower', frame);
  
  game.physics.enable(this)
  this.isOpen = false;
  this.body.allowGravity = false;

  this.game = game;
};

Flower.prototype = Object.create(Phaser.Sprite.prototype);
Flower.constructor = Flower;

Flower.prototype.swap = function() {
  this.isOpen = !this.isOpen;
  this.loadTexture(this.isOpen ? 'open_flower' : 'closed_flower');
}

module.exports = Flower;