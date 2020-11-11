import Phaser from 'phaser';
import config from '../config/config';
import EventDispatcher from '../eventDispatcher';


const content = "Hey player wake up!, wake up!. There's something really weird... ...going on in the city! There's monsters all over the place!... ...We have to get out!";


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

const createTextBox = (scene, x, y, config, window, icon, eventEmit = null) => {
  const wrapWidth = GetValue(config, 'wrapWidth', 0);
  const fixedWidth = GetValue(config, 'fixedWidth', 0);
  const fixedHeight = GetValue(config, 'fixedHeight', 0);
  const textBox = scene.rexUI.add.textBox({
    x,
    y,

    background: scene.add.image(0, 0, window),
    icon: scene.add.image(0, 0, icon).setScale(2),
    iconMask: false,
    text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

    action: scene.add.image(0, 0, 'nextPage').setScale(2).setVisible(false),

    space: {
      left: 30,
      right: 30,
      top: 30,
      bottom: 30,
      icon: 20,
      text: 20,
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
        if (eventEmit != null) {
          scene.emitter.emit(eventEmit);
        }
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
    this.mainChar = this.add.sprite(xPos + 32, yPos - 50, 'mainDown');
    this.emitter = EventDispatcher.getInstance();

    this.redHeadShow = () => {
      this.redHeadChar.visible = true;
    };

    this.mainCharShow = () => {
      this.mainChar.visible = true;
    };

    this.redHeadMoveUp = () => {
      this.tweens.add({ targets: this.redHeadChar, duration: 3500, y: 140 });
      this.redHeadChar.anims.play('redHeadWalkUp');
    };

    this.redHeadMoveRight = () => {
      this.tweens.add({ targets: this.redHeadChar, duration: 1500, x: xPos - 36 });
      this.redHeadChar.anims.play('redHeadWalkRight');
    };

    this.redHeadMessage = () => {
      this.redHeadChar.anims.pause(this.redHeadChar.anims.currentAnim.frames[1]);
      createTextBox(this, xPos - 340, 350, {
        wrapWidth: 470,
      }, 'lightWindow', 'redHeadFace', 'wakeUp').start(content, 50);
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

    this.anims.create({
      key: 'mainCharWalkDown',
      frames: this.anims.generateFrameNumbers('mainUp'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'mainCharWalkLeft',
      frames: this.anims.generateFrameNumbers('mainLeft'),
      frameRate: 10,
      repeat: -1,
    });

    this.redHeadChar.setScale(4);
    this.redHeadChar.visible = false;
    this.mainChar.setScale(4);
    this.mainChar.visible = false;
    this.wakeUpChar = () => {
      this.introSleepSprite.destroy();
      this.mainCharShow();
    };

    this.emitter.on('wakeUp', this.wakeUpChar);

    this.introSleepSprite.play('introSleepingAnim');
    this.time.delayedCall(1000, this.redHeadShow, [], this);
    this.time.delayedCall(2000, this.redHeadMoveUp, [], this);
    this.time.delayedCall(5300, this.redHeadMoveRight, [], this);
    this.time.delayedCall(7000, this.redHeadMessage, [], this);
  }
}