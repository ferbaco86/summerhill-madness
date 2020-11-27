import Phaser from 'phaser';

export default class HealthDisplay extends Phaser.GameObjects.Container {
  constructor(scene, x, y, iconTexture, text) {
    super(scene, x, y);
    this.iconTexture = iconTexture;
    this.text = text;
    this.x = x;
    this.y = y;
    this.healthIcon = new Phaser.GameObjects.Image(scene, -70, 0, iconTexture);
    this.healthText = new Phaser.GameObjects.Text(scene, 0, 0, text,
      {
        color: '#ffffff', fontSize: 20, fontFamily: 'pixelFont',
      });
    this.add(this.healthText);
    this.add(this.healthIcon);
    this.healthIcon.setOrigin(0.5);
    this.healthIcon.setScale(2);
    this.healthText.setOrigin(0.5);
    scene.add.existing(this);
  }

  setHealthText(text) {
    this.healthText.setText(text);
  }

  setPosition(x, y) {
    this.setX(x);
    this.setY(y);
  }
}