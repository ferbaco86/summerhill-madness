import Phaser from 'phaser';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  create() {
    this.scene.launch('BattleUI');
  }

  update() {

  }

}