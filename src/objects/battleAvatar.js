import Phaser from 'phaser';

export default class BattleAvatar extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, originX, originY) {
    super(scene, x, y, texture, 0);
    this.originX = originX;
    this.originY = originY;

    this.setOrigin(originX, originY);
  }
}