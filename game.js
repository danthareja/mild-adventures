var GameState = function(game) {};

// Load images and sounds
GameState.prototype.preload = function() {
  game.load.image('openflower', 'assets/openflower.png')
  game.load.image('closedflower', 'assets/closedflower.png')
  game.load.image('player', 'assets/theadventurer.png')
  game.load.image('ground', 'assets/ground-01.png')
  game.load.image('rock', 'assets/rock.png')
};

// Setup the example
GameState.prototype.create = function() {
	// Set stage background to something sky colored
	this.game.stage.backgroundColor = '#ffffff';

	// Define movement constants
	this.MAX_SPEED = 500; // pixels/second
	this.ACCELERATION = 1500; // pixels/second/second
	this.DRAG = 600; // pixels/second
	this.GRAVITY = 2600; // pixels/second/second
	this.JUMP_SPEED = -500; // pixels/second (negative y is up)

	// Create a player sprite
	this.player = this.game.add.sprite(this.game.width/2, this.game.height - 80, 'player');

	// Enable physics on the player
	this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

	// Make player collide with world boundaries so he doesn't leave the stage
	this.player.body.collideWorldBounds = true;

	// Set player minimum and maximum movement speed
	this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y

	// Add drag to the player that slows them down when they are not accelerating
	this.player.body.drag.setTo(this.DRAG, 0); // x, y

	// Since we're jumping we need gravity
	this.game.physics.arcade.gravity.y = this.GRAVITY;

	// Flag to track if the jump button is pressed
	this.jumping = false;

	// Create some ground for the player to walk on
	this.ground = this.game.add.group();
	for(var x = 0; x < this.game.width; x += 32) {
		// Add the ground blocks, enable physics on each, make them immovable
		var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
		this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
		groundBlock.body.immovable = true;
		groundBlock.body.allowGravity = false;
		this.ground.add(groundBlock);
	}

	// Capture certain keys to prevent their default actions in the browser.
	// This is only necessary because this is an HTML5 game. Games on other
	// platforms may not need code like this.
	this.game.input.keyboard.addKeyCapture([
		Phaser.Keyboard.LEFT,
		Phaser.Keyboard.RIGHT,
		Phaser.Keyboard.UP,
		Phaser.Keyboard.DOWN
	]);

  this.flowerIsOpen = true;
  this.addFlower();
};

GameState.prototype.addFlower = function(){
  var type = this.flowerIsOpen ? 'open' : 'closed'
  this.flower = this.game.add.sprite(this.game.width - 300, this.game.height - 143, type+'flower');
  this.game.physics.enable(this.flower)
  this.flower.body.allowGravity = false;
  if(this.flowerIsOpen) {
    this.flower.scale.setTo(1,1.7)
  }
}

GameState.prototype.swapFlower = function() {
  if (!this.recentFlowerOverlap) {
    this.flower.kill();
    this.flowerIsOpen = !this.flowerIsOpen;
    this.addFlower();
  }
}

// The update() method is called every frame
GameState.prototype.update = function() {

  this.recentFlowerOverlap = this.game.physics.arcade.overlap(this.player, this.flower, this.swapFlower, null, this)

	// Collide the player with the ground
	this.game.physics.arcade.collide(this.player, this.ground);

	if (this.leftInputIsActive()) {
		// If the LEFT key is down, set the player velocity to move left
		this.player.body.acceleration.x = -this.ACCELERATION;
	} else if (this.rightInputIsActive()) {
		// If the RIGHT key is down, set the player velocity to move right
		this.player.body.acceleration.x = this.ACCELERATION;
	} else {
		this.player.body.acceleration.x = 0;
	}

	// Set a variable that is true when the player is touching the ground
	var onTheGround = this.player.body.touching.down;

	// If the player is touching the ground, let him have 2 jumps
	if (onTheGround) {
		this.jumps = 2;
		this.jumping = false;
	}

	// Jump! Keep y velocity constant while the jump button is held for up to 150 ms
	if (this.jumps > 0 && this.upInputIsActive(150)) {
		this.player.body.velocity.y = this.JUMP_SPEED;
		this.jumping = true;
	}

	// Reduce the number of available jumps if the jump input is released
	if (this.jumping && this.upInputReleased()) {
		this.jumps--;
		this.jumping = false;
	}
};


// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
GameState.prototype.leftInputIsActive = function() {
	var isActive = false;

	isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
	isActive |= (this.game.input.activePointer.isDown &&
		this.game.input.activePointer.x < this.game.width/4);

	return isActive;
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
GameState.prototype.rightInputIsActive = function() {
	var isActive = false;

	isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
	isActive |= (this.game.input.activePointer.isDown &&
		this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);

	return isActive;
};

// This function should return true when the player activates the "jump" control
// In this case, either holding the up arrow or tapping or clicking on the center
// part of the screen.
GameState.prototype.upInputIsActive = function(duration) {
	var isActive = false;

	isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
	isActive |= (this.game.input.activePointer.justPressed(duration + 1000/60) &&
		this.game.input.activePointer.x > this.game.width/4 &&
		this.game.input.activePointer.x < this.game.width/2 + this.game.width/4);

	return isActive;
};

// This function returns true when the player releases the "jump" control
GameState.prototype.upInputReleased = function() {
	var released = false;

	released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
	released |= this.game.input.activePointer.justReleased();

	return released;
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);