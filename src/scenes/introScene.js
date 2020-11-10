import Phaser from 'phaser';
import config from '../config/config';


export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('Intro');
  }


  create() {
    const xPos = config.width / 2;
    const yPos = config.height / 2;
    this.add.image(xPos, yPos, 'introBG');
    this.introSleepSprite = this.add.sprite(xPos + 33, yPos - 163, 'introSleeping');

    this.anims.create({
      key: 'introSleepingAnim',
      frames: this.anims.generateFrameNumbers('introSleeping'),
      frameRate: 10,
      repeat: 20,
      hideOnComplete: true,
    });

    this.introSleepSprite.play('introSleepingAnim');
  }
}