import Phaser from 'phaser';

export default class BattleMenuItem extends Phaser.GameObjects.Text {
  constructor(x, y, text, scene) {
    super(scene, x, y, text, {
      color: '#ffffff',
      align: 'left',
      fontSize: 35,
      fontFamily: 'pixelFont',
    });
  }

  select() {
    this.setColor('#f8ff38');
  }

  deselect() {
    this.setColor('#ffffff');
  }

  unitKilled() {
    this.active = false;
    this.visible = false;
  }
}