var Keyboard = function(game) {
  Phaser.Keyboard.call(game);

  // Capture certain keys to prevent their default actions in the browser.
  // This is only necessary because this is an HTML5 game. Games on other
  // platforms may not need code like this.
  game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN
  ]);

  this.game = game;
}

Keyboard.prototype = Object.create(Phaser.Keyboard.prototype);
Keyboard.constructor = Keyboard;

// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
Keyboard.prototype.leftInputIsActive = function() {
  var isActive = false;

  isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
  isActive |= (this.game.input.activePointer.isDown &&
    this.game.input.activePointer.x < this.game.width/4);

  return isActive;
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
Keyboard.prototype.rightInputIsActive = function() {
  var isActive = false;

  isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
  isActive |= (this.game.input.activePointer.isDown &&
    this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);

  return isActive;
};

// This function should return true when the player activates the "jump" control
// In this case, either holding the up arrow or tapping or clicking on the center
// part of the screen.
Keyboard.prototype.upInputIsActive = function(duration) {
  var isActive = false;

  isActive = this.game.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
  isActive |= (this.game.input.activePointer.justPressed(duration + 1000/60) &&
    this.game.input.activePointer.x > this.game.width/4 &&
    this.game.input.activePointer.x < this.game.width/2 + this.game.width/4);

  return isActive;
};

// This function returns true when the player releases the "jump" control
Keyboard.prototype.upInputReleased = function() {
  var released = false;

  released = this.game.input.keyboard.upDuration(Phaser.Keyboard.UP);
  released |= this.game.input.activePointer.justReleased();

  return released;
};

Keyboard.prototype.downInputIsActive = function() {
  var isActive = false;

  isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN);
  isActive |= (this.game.input.activePointer.isDown &&
    this.game.input.activePointer.x < this.game.width/4);

  return isActive;
};
