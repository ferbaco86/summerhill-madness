import Phaser from 'phaser';

export default class BattleUIScene extends Phaser.Scene {
  constructor() {
    super('BattleUI');
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.add.image(0, 385, 'battleUIBG').setOrigin(0, 0);
  }

  update() {

  }
}