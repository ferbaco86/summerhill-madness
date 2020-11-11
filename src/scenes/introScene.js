import Phaser from 'phaser';
import config from '../config/config';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const content = "Hey player wake up!, wake up!. There's something really weird going on in the city! There's monsters all over the place!. We have to get out!";

const { GetValue } = Phaser.Utils.Objects;

const getBBcodeText = (scene, wrapWidth, fixedWidth, fixedHeight) => scene.rexUI.add.BBCodeText(0, 0, '', {
  fixedWidth,
  fixedHeight,

  fontSize: '26px',
  fontFamily: 'pixelFont',
  wrap: {
    mode: 'word',
    width: wrapWidth,
  },
  maxLines: 2,
});

const createTextBox = (scene, x, y, config) => {
  const wrapWidth = GetValue(config, 'wrapWidth', 0);
  const fixedWidth = GetValue(config, 'fixedWidth', 0);
  const fixedHeight = GetValue(config, 'fixedHeight', 0);
  const textBox = scene.rexUI.add.textBox({
    x,
    y,

    background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
      .setStrokeStyle(2, COLOR_LIGHT),

    icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

    // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
    text: getBBcodeText(scene, wrapWidth - 50, fixedWidth, fixedHeight),

    action: scene.add.image(0, 0, 'nextPage').setScale(2).setTint(COLOR_LIGHT).setVisible(false),

    space: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
      icon: 10,
      text: 10,
    },
  })
    .setOrigin(0)
    .layout();

  textBox
    .setInteractive()
    .on('pointerdown', () => {
      const icon = textBox.getElement('action').setVisible(false);
      textBox.resetChildVisibleState(icon);
      if (textBox.isLastPage) {
        textBox.destroy();
      }
      if (textBox.isTyping) {
        textBox.stop(true);
      } else {
        textBox.typeNextPage();
      }
    }, textBox)
    .on('pageend', () => {
      const icon = textBox.getElement('action').setVisible(true);
      textBox.resetChildVisibleState(icon);
      icon.y -= 30;
      scene.tweens.add({
        targets: icon,
        y: '+=30',
        ease: 'Bounce',
        duration: 500,
        repeat: 0,
        yoyo: false,
      });
    }, textBox);
  // .on('type', function () {
  // })
  return textBox;
};

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

    this.redHeadShow = () => {
      this.redHeadChar.visible = true;
    };

    this.redHeadMoveUp = () => {
      this.tweens.add({ targets: this.redHeadChar, duration: 3500, y: 140 });
      this.redHeadChar.anims.play('redHeadWalkUp');
    };

    this.redHeadMoveRight = () => {
      this.tweens.add({ targets: this.redHeadChar, duration: 1500, x: xPos - 36 });
      this.redHeadChar.anims.play('redHeadWalkRight');
    };

    this.redHeadSMessage = () => {
      this.redHeadChar.anims.pause(this.redHeadChar.anims.currentAnim.frames[1]);
    };

    this.anims.create({
      key: 'introSleepingAnim',
      frames: this.anims.generateFrameNumbers('introSleeping'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'redHeadWalkUp',
      frames: this.anims.generateFrameNumbers('redHeadUp'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'redHeadWalkRight',
      frames: this.anims.generateFrameNumbers('redHeadRight'),
      frameRate: 10,
      repeat: -1,
    });

    this.redHeadChar.setScale(4);
    this.redHeadChar.visible = false;

    this.introSleepSprite.play('introSleepingAnim');
    this.time.delayedCall(1000, this.redHeadShow, [], this);
    this.time.delayedCall(2000, this.redHeadMoveUp, [], this);
    this.time.delayedCall(5300, this.redHeadMoveRight, [], this);
    this.time.delayedCall(7000, this.redHeadSMessage, [], this);

    createTextBox(this, 100, 400, {
      wrapWidth: 500,
    }).start(content, 50);
  }
}