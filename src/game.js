import Game from './GameState';
import Boot from './BootState';

//  Create your Phaser game and inject it into the game div
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');
// var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameDiv');
// var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'gameDiv');

// Add states your game has
game.state.add('Boot', Boot);
game.state.add('Game', Game);

// Kick off the game creation process with the Boot state
game.state.start('Boot');
