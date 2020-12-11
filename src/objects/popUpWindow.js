import Phaser from 'phaser';

export default class PopUpWindow extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.windowBG = this.scene.add.image(this.x / 2, this.y / 2, 'winWindow');
    this.windowBG.setDepth(10);
    this.windowBG.setOrigin(0);
    this.scene.add.existing(this);
  }
}