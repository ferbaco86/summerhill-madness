import Phaser from 'phaser';
import config from '../config/config';
import EventDispatcher from '../eventDispatcher';


const redHeadText = "Hey player wake up!, wake up!. There's something really weird... ...going on in the city! There's monsters all over the place!... ...We have to get out!";
const mainCharText = "WOW!! are you for real?! We should probably go to Danny's... ...house and see how he is doing! Let me grab something... ...to use as a weapon and we should get going!";
const batPickUpText = 'Cool! you found a bat. This will come in handy for dealing with monsters';

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

const createTextBox = (scene, x, y, config, window, icon, speechFX, eventEmit = null) => {
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
    }, textBox)
    .on('type', () => {
      speechFX.play();
    });
  return textBox;
};

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  create() {
    this.sys.game.globals.bgMusic.stop();
    const xPos = config.width / 2;
    const yPos = config.height / 2;

    // Background
    this.add.image(xPos, yPos, 'introBG');

    // Animation Sprites
    this.introSleepSprite = this.add.sprite(xPos + 32, yPos - 162, 'introSleeping');
    this.redHeadChar = this.add.sprite(xPos - 150, 540, 'redHeadUp');
    this.mainChar = this.add.sprite(xPos + 32, yPos - 50, 'mainDown');

    // Event Emitter
    this.emitter = EventDispatcher.getInstance();

    // Scene Sounds
    this.doorOpenFx = this.sound.add('doorOpen', { volume: 0.5, loop: false });
    this.textFx = this.sound.add('textFX', {
      volume: 0.2, loop: false,
    });
    this.stepsFx = this.sound.add('stepsFX', { volume: 0.05, loop: true, rate: 1.2 });
    this.getItemFx = this.sound.add('getItemFX', { volume: 0.3, loop: false });
    this.wowFx = this.sound.add('wowFX', { volume: 0.5, loop: false });


    this.redHeadShow = () => {
      this.redHeadChar.visible = true;
      this.doorOpenFx.play();
    };

    this.mainCharShow = () => {
      this.mainChar.visible = true;
      this.wowFx.play();
    };

    this.redHeadMoveUp = () => {
      this.tweens.add({ targets: this.redHeadChar, duration: 3500, y: 140 });
      this.redHeadChar.anims.play('redHeadWalkUp');
      this.stepsFx.play();
    };

    this.redHeadMoveRight = () => {
      this.tweens.add({ targets: this.redHeadChar, duration: 1500, x: xPos - 36 });
      this.redHeadChar.anims.play('redHeadWalkRight');
    };

    this.redHeadMessage = () => {
      this.redHeadChar.anims.pause(this.redHeadChar.anims.currentAnim.frames[1]);
      createTextBox(this, xPos - 340, 350, {
        wrapWidth: 470,
      }, 'lightWindow', 'redHeadFace', this.textFx, 'wakeUp').start(redHeadText, 50);
      this.stepsFx.stop();
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
      key: 'redHeadWalkDown',
      frames: this.anims.generateFrameNumbers('redHeadDown'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'redHeadWalkLeft',
      frames: this.anims.generateFrameNumbers('redHeadLeft'),
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
      frames: this.anims.generateFrameNumbers('mainDown'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'mainCharWalkLeft',
      frames: this.anims.generateFrameNumbers('mainLeft'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'mainCharWalkRight',
      frames: this.anims.generateFrameNumbers('mainRight'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'mainCharWalkUp',
      frames: this.anims.generateFrameNumbers('mainUp'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'batPickUp',
      frames: this.anims.generateFrameNumbers('mainBatPick'),
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
      createTextBox(this, xPos - 340, 350, {
        wrapWidth: 470,
      }, 'lightWindow', 'mainFace', this.textFx, 'grabWeapon').start(mainCharText, 50);
    };

    this.grabWeaponAnim = () => {
      this.moveMainUp = () => {
        this.tweens.add({ targets: this.mainChar, duration: 900, y: 180 });
        this.mainChar.anims.play('mainCharWalkUp');
        this.redHeadChar.anims.load('redHeadWalkLeft', 1);
      };

      this.pickUpBat = () => {
        this.mainChar.anims.play('batPickUp');
        createTextBox(this, xPos - 340, 350, {
          wrapWidth: 470,
        }, 'lightWindow', 'purpleSquare', this.textFx, 'goOutside').start(batPickUpText, 50);
        this.stepsFx.stop();

        this.getItemFx.play();
      };

      this.tweens.add({ targets: this.mainChar, duration: 3500, x: xPos - 286 });
      this.time.delayedCall(3550, this.moveMainUp, [], this);
      this.time.delayedCall(4300, this.pickUpBat, [], this);
      this.mainChar.anims.play('mainCharWalkLeft');
      this.redHeadChar.anims.load('redHeadWalkDown', 1);
      this.stepsFx.play();
    };

    this.exitRoomAnim = () => {
      this.mainCharExitRight = () => {
        this.tweens.add({ targets: this.mainChar, duration: 2500, x: xPos - 140 });
        this.mainChar.anims.play('mainCharWalkRight');
      };
      this.mainCharExitDown = () => {
        this.tweens.add({ targets: this.mainChar, duration: 3500, y: 550 });
        this.mainChar.anims.play('mainCharWalkDown');
        this.mainChar.destroy();
      };
      this.redHeadCharExitLeft = () => {
        this.tweens.add({ targets: this.redHeadChar, duration: 1500, x: xPos - 140 });
        this.redHeadChar.anims.play('redHeadWalkLeft');
      };
      this.redHeadCharExitDown = () => {
        this.tweens.add({ targets: this.redHeadChar, duration: 1500, y: 550 });
        this.redHeadChar.anims.play('redHeadWalkDown');
      };
      this.tweens.add({ targets: this.mainChar, duration: 1500, y: 450 });
      this.tweens.add({ targets: this.redHeadChar, duration: 3500, y: 400 });
      this.mainChar.anims.play('mainCharWalkDown');
      this.redHeadChar.anims.play('redHeadWalkDown');
      this.time.delayedCall(1500, this.mainCharExitRight, [], this);
      this.time.delayedCall(2500, this.redHeadCharExitLeft, [], this);
      this.time.delayedCall(2600, this.mainCharExitDown, [], this);
      this.time.delayedCall(2700, this.redHeadCharExitDown, [], this);
      this.stepsFx.play();
    };

    this.emitter.on('wakeUp', this.wakeUpChar);
    this.emitter.on('grabWeapon', this.grabWeaponAnim);
    this.emitter.on('goOutside', this.exitRoomAnim);


    this.introSleepSprite.play('introSleepingAnim');
    this.time.delayedCall(1000, this.redHeadShow, [], this);
    this.time.delayedCall(2000, this.redHeadMoveUp, [], this);
    this.time.delayedCall(5300, this.redHeadMoveRight, [], this);
    this.time.delayedCall(7000, this.redHeadMessage, [], this);
  }
}