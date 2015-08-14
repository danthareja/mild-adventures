class Flower extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, 'closed_flower', frame);
    
    game.physics.enable(this)
    this.isOpen = false;
    this.body.allowGravity = false;
  }

  swap() {
    this.isOpen = !this.isOpen;
    this.loadTexture(this.isOpen ? 'open_flower' : 'closed_flower');
  }
}

export default Flower;
