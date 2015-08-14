import Keyboard from './Keyboard';

class Adventurer extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, 'adventurer', frame);

    // Define movement constants
    this.MAX_SPEED = 500; // pixels/second
    this.ACCELERATION = 1500; // pixels/second/second
    this.DRAG = 1000; // pixels/second
    this.JUMP_SPEED = -500; // pixels/second (negative y is up)
    
    // Flag to track if the jump button is pressed
    this.jumping = false;

    this.addAnimations();

    this.keyboard = new Keyboard(game);

    // Enable physics on the player
    game.physics.enable(this, Phaser.Physics.ARCADE);

    // Make player collide with world boundaries so he doesn't leave the stage
    this.body.collideWorldBounds = true;

    // Set player minimum and maximum movement speed
    this.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y

    // Add drag to the player that slows them down when they are not accelerating
    this.body.drag.setTo(this.DRAG, 0); // x, y
  }

  move() {
    if (this.keyboard.leftInputIsActive()) {
      // If the LEFT key is down, set the player velocity to move left
      this.animations.play('walk-left');
      this.body.acceleration.x = -this.ACCELERATION;
    } else if (this.keyboard.rightInputIsActive()) {
      // If the RIGHT key is down, set the player velocity to move right
      this.animations.play('walk-right');
      this.body.acceleration.x = this.ACCELERATION;
    } else if (this.keyboard.downInputIsActive()) {
      this.animations.play('right-to-neutral')
    } else {
      this.body.acceleration.x = 0;
    }

    // Set a variable that is true when the player is touching the ground
    var onTheGround = this.body.touching.down;

    // If the player is touching the ground, let him have 2 jumps
    if (onTheGround) {
      this.jumps = 2;
      this.jumping = false;
    }

    // Jump! Keep y velocity constant while the jump button is held for up to 150 ms
    if (this.jumps > 0 && this.keyboard.upInputIsActive(150)) {
      this.body.velocity.y = this.JUMP_SPEED;
      this.jumping = true;
    }

    // Reduce the number of available jumps if the jump input is released
    if (this.jumping && this.keyboard.upInputReleased()) {
      this.jumps--;
      this.jumping = false;
    }
  }

  addAnimations() {
    this.animations.add('neutral', ['neutral'], 10)
    this.animations.add('jump', ['jump-3', 'neutral'], 10);
    this.animations.add('neutral-to-right', [
      'walk-right-1', 
      'walk-right-2',
      'walk-right-3'
    ], 10);
    this.animations.add('right-to-neutral', [
      'walk-right-3',
      'walk-right-2',
      'walk-right-1',
      'neutral'
    ], 10);
    this.animations.add('walk-right', [
      'walk-right-4',
      'walk-right-5',
      'walk-right-6',
      'walk-right-7',
      'walk-right-8',
      'walk-right-6'
    ], 10, true, false);

    this.animations.add('neutral-to-left', [
      'walk-left-1', 
      'walk-left-2',
      'walk-left-3'
    ], 20);
    this.animations.add('left-to-neutral', [
      'walk-left-3',
      'walk-left-2',
      'walk-left-1',
      'neutral'
    ], 10);
    this.animations.add('walk-left', [
      'walk-left-4',
      'walk-left-5',
      'walk-left-6',
      'walk-left-7',
      'walk-left-8',
      'walk-left-6'
    ], 10, true, false);
  }
}

export default Adventurer;
