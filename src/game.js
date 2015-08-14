var Ground = require('./Ground');
var Flower = require('./Flower');
var Keyboard = require('./Keyboard');
var Adventurer = require('./Adventurer');

var GameState = function(game) {
  this.GRAVITY = 2600; // pixels/second/second
};

GameState.prototype.preload = function() {
  this.game.load.atlasJSONHash('adventurer', 'assets/adventurer/adventurer.png', 'assets/adventurer/adventurer.json')
  this.game.load.image('ground', 'assets/ground-01.png');
  this.game.load.image('open_flower', 'assets/flower/open.png');
  this.game.load.image('closed_flower', 'assets/flower/closed.png');
};

GameState.prototype.create = function() {
  this.game.stage.backgroundColor = '#ffffff';
  this.game.physics.arcade.gravity.y = this.GRAVITY;

  this.player = new Adventurer(this.game, this.game.width/2, this.game.height - 78, 'neutral.png');
  this.game.add.existing(this.player);

  this.ground = new Ground(this.game, 0, this.game.height - 40);
  this.game.add.existing(this.ground);

  this.keyboard = new Keyboard(this.game);

  this.flower = new Flower(this.game, this.game.width - 300, this.game.height - 143)
  this.game.add.existing(this.flower);
};

GameState.prototype.update = function() {
  // Let the player stand on the ground
  this.game.physics.arcade.collide(this.player, this.ground);

  // Listen to keyboard inputs and move player around
  this.player.move();

  // Listen for flower overlaps
  this.updateFlower();
};

GameState.prototype.updateFlower = function() {
  this.recentFlowerOverlap = this.game.physics.arcade.overlap(this.player, this.flower, function(player, flower) {
    if (!this.recentFlowerOverlap) {
      flower.swap();
    }
  }, null, this);
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);

