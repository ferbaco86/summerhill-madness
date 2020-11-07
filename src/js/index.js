import Phaser from 'phaser';
import config from '../config/config';
import GameScene from '../scenes/gameScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.start('Game');
  }
}

window.game = new Game();