import Ground from './Ground';
import Tree from './Tree';
import Flower from './Flower';
import Keyboard from './Keyboard';
import Adventurer from './Adventurer';

class GameState {
  constructor(game) {
    this.GRAVITY = 2600; // pixels/second/second
    this.game = game;
  }

  create() {
    this.game.stage.backgroundColor = '#ffffff';
    this.game.physics.arcade.gravity.y = this.GRAVITY;

    this.keyboard = new Keyboard(this.game);
    this.addSprite('tree', new Tree(this.game, 0, 0));
    this.addSprite('ground', new Ground(this.game, 0, this.game.height - 40));
    this.addSprite('flower', new Flower(this.game, this.game.width - 300, this.game.height - 143))
    this.addSprite('player', new Adventurer(this.game, this.game.width/2, this.game.height - 78, 'neutral'));
  }

  addSprite(name, sprite) {
    this[name] = sprite;
    this.game.add.existing(sprite);
  }

  update() {
    // Let the player stand on the ground
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.tree, this.ground);

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
