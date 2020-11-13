import Phaser from 'phaser';

export default class TownScene extends Phaser.Scene {
  constructor() {
    super('Town');
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.add.image(500, 500, 'introBG');
  }

  update () {}
}