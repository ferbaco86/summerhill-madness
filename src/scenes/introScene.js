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
    this.introSleepSprite = this.add.sprite(xPos + 32, yPos - 162, 'introSleeping');
    this.redHeadChar = this.add.sprite(xPos - 150, 540, 'redHeadUp');

    this.playerShow = () => {
      this.redHeadChar.visible = true;
    };

    this.anims.create({
      key: 'introSleepingAnim',
      frames: this.anims.generateFrameNumbers('introSleeping'),
      frameRate: 10,
      repeat: 5,
      hideOnComplete: true,
    });

    this.anims.create({
      key: 'redHeadWalkUp',
      frames: this.anims.generateFrameNumbers('redHeadUp'),
      frameRate: 10,
      repeat: -1,
    });
    this.redHeadChar.setScale(4);
    this.redHeadChar.visible = false;

    this.introSleepSprite.play('introSleepingAnim');
    this.time.delayedCall(3000, this.playerShow, [], this);
  }
}