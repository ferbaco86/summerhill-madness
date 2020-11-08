import Phaser from 'phaser';
import phaserLogo from '../assets/logo.png';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('phaserLogo', phaserLogo);
  }

  create() {
    this.add.image(400, 300, 'phaserLogo');
  }
}