import Ground from './Ground';
import Flower from './Flower';
import Keyboard from './Keyboard';
import Adventurer from './Adventurer';

class GameState {
  constructor(game) {
    this.GRAVITY = 2600; // pixels/second/second
    this.game = game;
  }

  preload() {
    this.game.load.atlasJSONHash('adventurer', 'assets/adventurer.png', 'assets/adventurer.json')
    this.game.load.image('ground', 'assets/ground-01.png');
    this.game.load.image('open_flower', 'assets/flower_open.png');
    this.game.load.image('closed_flower', 'assets/flower_closed.png');
  }

  create() {
    this.game.stage.backgroundColor = '#ffffff';
    this.game.physics.arcade.gravity.y = this.GRAVITY;

    this.player = new Adventurer(this.game, this.game.width/2, this.game.height - 78, 'neutral');
    this.game.add.existing(this.player);

    this.ground = new Ground(this.game, 0, this.game.height - 40);
    this.game.add.existing(this.ground);

    this.keyboard = new Keyboard(this.game);

    this.flower = new Flower(this.game, this.game.width - 300, this.game.height - 143)
    this.game.add.existing(this.flower);
  }

  update() {
    // Let the player stand on the ground
    this.game.physics.arcade.collide(this.player, this.ground);

    // Listen to keyboard inputs and move player around
    this.player.move();

    // Listen for flower overlaps
    this.updateFlower();
  }

  updateFlower() {
    this.recentFlowerOverlap = this.game.physics.arcade.overlap(this.player, this.flower, function(player, flower) {
      if (!this.recentFlowerOverlap) {
        flower.swap();
      }
    }, null, this);
  }
}

export default GameState;
