import Phaser from 'phaser';

export default class HudDisplay extends Phaser.GameObjects.Container {
  constructor(scene, x, y, portrait, hpIcon, hpText, apIcon, apText, level) {
    super(scene, x, y);
    this.portrait = portrait;
    this.hpIcon = hpIcon;
    this.hpText = hpText;
    this.apIcon = apIcon;
    this.apText = apText;
    this.level = level;
    this.x = x;
    this.y = y;
    this.charPortrait = new Phaser.GameObjects.Image(scene, 10, 10, this.portrait);
    this.healthIcon = new Phaser.GameObjects.Image(scene, 20, 0, this.hpIcon);
    this.healthText = new Phaser.GameObjects.Text(scene, 30, 0, this.hpText,
      {
        color: '#ffffff', fontSize: 8, fontFamily: 'pixelFont',
      });
    this.levelText = new Phaser.GameObjects.Text(scene, 2, 15, `Lv. ${this.level}`,
      {
        color: '#ffffff', fontSize: 8, fontFamily: 'pixelFont',
      });
    this.charPortrait.setScale(0.3);
    this.healthIcon.setScale(0.6);
    this.add(this.levelText);
    this.add(this.charPortrait);
    this.add(this.healthText);
    this.add(this.healthIcon);
    this.healthIcon.setOrigin(0);
    this.healthText.setOrigin(0);
    this.actionPointsIcon = new Phaser.GameObjects.Image(scene, 20, 10, this.apIcon);
    this.actionPointsText = new Phaser.GameObjects.Text(scene, 30, 10, this.apText,
      {
        color: '#ffffff', fontSize: 8, fontFamily: 'pixelFont',
      });
    this.actionPointsIcon.setScale(0.6);
    this.add(this.actionPointsText);
    this.add(this.actionPointsIcon);
    this.actionPointsIcon.setOrigin(0);
    this.actionPointsText.setOrigin(0);
    scene.add.existing(this);
  }

  setHealthText(text) {
    this.healthText.setText(text);
  }

  setApText(text) {
    this.actionPointsText.setText(text);
  }
}