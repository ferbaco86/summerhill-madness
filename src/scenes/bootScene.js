import Phaser from 'phaser';
import Title from '../assets/title.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', Title);
  }

  create() {
    this.scene.start('Preloader');
  }
}