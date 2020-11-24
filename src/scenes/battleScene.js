import Phaser from 'phaser';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.scene.launch('BattleUI');
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
  }

  update() {

  }

}