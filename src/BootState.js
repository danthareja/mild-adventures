class BootState {
	constructor(game) {
    this.game = game;
    // Your game can check game.orientated in internal loops to know if it should pause or not
    this.game.orientated = false;
  }

  init() {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop) {
     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
     this.scale.setMinMax(480, 260, 1024, 768);
     this.scale.pageAlignHorizontally = true;
     this.scale.pageAlignVertically = true;
     this.game.orientated = true;
    } else {
     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
     this.scale.setMinMax(480, 260, 1024, 768);
     this.scale.pageAlignHorizontally = true;
     // this.scale.pageAlignVertically = true;
     this.scale.forceOrientation(true, false);
     this.scale.setResizeCallback(this.gameResized, this);
     this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
     this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
    }
  }

  preload() {
    // Here we load the assets required for our preloader (e.g a background and a loading bar)
    this.game.load.image('ground', 'assets/ground-01.png');
    this.game.load.image('background', 'assets/background.png');
    this.game.load.image('tree', 'assets/tree.png');

    // (For now this is also taking the place of a Preloader class)
    this.game.load.atlasJSONHash('adventurer', 'assets/adventurer.png', 'assets/adventurer.json')
    this.game.load.image('open_flower', 'assets/flower_open.png');
    this.game.load.image('closed_flower', 'assets/flower_closed.png');
  }

  create() {
    this.state.start('Game');
  }

  gameResized(width, height) {
    // This could be handy if you need to do any extra processing if the game resizes.
    // A resize could happen if for example swapping orientation on a device or resizing the browser window.
    // Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.
    console.log('gameResized called ${width}x${height}')
  }

  enterIncorrectOrientation() {
    this.game.orientated = false;
    document.getElementById('orientation').style.display = 'block';
  }

  leaveIncorrectOrientation() {
    this.game.orientated = true;
    document.getElementById('orientation').style.display = 'none';
  }
}

export default BootState;
