import Keyboard from './Keyboard';

class Adventurer extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, 'adventurer', frame);

    // Define movement constants
    this.MAX_SPEED = 400; // pixels/second
    this.ACCELERATION = 1000; // pixels/second/second
    this.TRANSITION_SPEED = 50;
    this.DRAG = 1000; // pixels/second
    this.JUMP_SPEED = -500; // pixels/second (negative y is up)
    this.MIN_ANIMATION_SPEED = 5; // frames/second
    this.MAX_ANIMATION_SPEED = 20; // frames/second
    this.TRANSITION_ANIMATION_SPEED = 20; // frames/second
    
    // Flag to track if the jump button is pressed
    this.jumping = false;

    this.keyboard = new Keyboard(game);

    this.addAnimations();

    // Enable physics on the player
    game.physics.enable(this, Phaser.Physics.ARCADE);

    // Make player collide with world boundaries so he doesn't leave the stage
    this.body.collideWorldBounds = true;

    // Set player minimum and maximum movement speed
    this.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y

    // Add drag to the player that slows them down when they are not accelerating
    this.body.drag.setTo(this.DRAG, 0); // x, y
  }

  // Called on every frame
  update() {
    this.move();
    this.animate();
  }
  move() {
    // Left, right, or stopped
    if (this.keyboard.leftInputIsActive()) {
      this.body.acceleration.x = -this.ACCELERATION;
    } else if (this.keyboard.rightInputIsActive()) {
      this.body.acceleration.x = this.ACCELERATION;
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

  animate() {
    var animationSpeed = Phaser.Math.mapLinear(
      Math.abs(this.body.velocity.x),
      0, // MIN_SPEED
      this.MAX_SPEED,
      this.MIN_ANIMATION_SPEED,
      this.MAX_ANIMATION_SPEED
    )

    // Physically moving left
    if (this.body.velocity.x < 0) {
      // Speeding up
      if (this.body.acceleration.x < 0) {
        // From start
        if (Math.abs(this.body.velocity.x) < this.TRANSITION_SPEED) {
          this.animations.play('neutral-to-left');
        }
      }
      // Slowing down
      else {
        // To stop
        if (Math.abs(this.body.velocity.x) < this.TRANSITION_SPEED) {
          this.animations.play('left-to-neutral');
        }
      }
      // Just crusing (in between transitions)
      if (Math.abs(this.body.velocity.x) > this.TRANSITION_SPEED) {
        // Walking animation hasn't started yet
        if (!this.animateWalkLeft.isPlaying) {
          this.animateWalkLeft.play(animationSpeed, true);
        }
        // Already walking
        else {
          this.animateWalkLeft.speed = animationSpeed
        }
      }
    }

    // Physically moving right
    if (this.body.velocity.x > 0) {
      // Speeding up
      if (this.body.acceleration.x > 0) {
        // From start
        if (Math.abs(this.body.velocity.x) < this.TRANSITION_SPEED) {
          this.animations.play('neutral-to-right');
        }
      }
      // Slowing down
      else {
        // To stop
        if (Math.abs(this.body.velocity.x) < this.TRANSITION_SPEED) {
          this.animations.play('right-to-neutral');
        }
      }
      // Just crusing (in between transitions)
      if (Math.abs(this.body.velocity.x) > this.TRANSITION_SPEED) {
        // Walking animation hasn't started yet
        if (!this.animateWalkRight.isPlaying) {
          this.animateWalkRight.play(animationSpeed, true);
        }
        // Already walking
        else {
          this.animateWalkRight.speed = animationSpeed
        }
      }
    }
  }

  addAnimations() {
    // Expose walking animations to alter speed
    this.animateWalkLeft = this.animations.add('walk-left', [
      'walk-left-4',
      'walk-left-5',
      'walk-left-6',
      'walk-left-7',
      'walk-left-8',
      'walk-left-6'
    ]);

    this.animateWalkRight = this.animations.add('walk-right', [
      'walk-right-4',
      'walk-right-5',
      'walk-right-6',
      'walk-right-7',
      'walk-right-8',
      'walk-right-6'
    ]);

    // Transitions
    this.animations.add('neutral-to-left', [
      'walk-left-1',
      'walk-left-2',
      'walk-left-3'
    ], this.TRANSITION_ANIMATION_SPEED, false);

    this.animations.add('left-to-neutral', [
      'walk-left-3',
      'walk-left-2',
      'walk-left-1',
      'neutral'
    ], this.TRANSITION_ANIMATION_SPEED, false);

    this.animations.add('neutral-to-right', [
      'walk-right-1', 
      'walk-right-2',
      'walk-right-3'
    ], this.TRANSITION_ANIMATION_SPEED, false);

    this.animations.add('right-to-neutral', [
      'walk-right-3',
      'walk-right-2',
      'walk-right-1',
      'neutral'
    ], this.TRANSITION_ANIMATION_SPEED, false);
  }
}

export default Adventurer;
