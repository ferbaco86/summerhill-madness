import Phaser from 'phaser';
import EventDispatcher from '../utils/eventDispatcher';
import utils from '../utils/utilsFunctions';


export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  create() {
    this.redHeadText = `Hey ${this.sys.game.globals.playerName} wake up!, wake up!. There's something really weird going on in the city! There's monsters all over the place! We have to get out!`;
    this.mainCharText = "WOW!! are you for real?! We should probably go to Danny's... ...house and see how he is doing! Let me grab something... ...to use as a weapon and we should get going!";
    this.batPickUpText = 'Cool! you found a bat. This will come in handy for dealing... ...with monsters';
    this.fromIntro = true;
    this.cameras.main.setBackgroundColor('#000000');
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.sys.game.globals.bgMusic.stop();
    const button = this.add.image(900, 570, 'maximize', 0).setScrollFactor(0);
    button.setInteractive();
    button.setDepth(30);
    button.setScale(3);
    const xPos = 500;
    const yPos = 300;

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
      utils.createTextBox(this, xPos - 340, 350, {
        wrapWidth: 470,
      }, 'lightWindow', 'redHeadFace', this.textFx, 'wakeUp').start(this.redHeadText, 50);
      this.stepsFx.stop();
    };

    this.redHeadChar.setScale(4);
    this.redHeadChar.visible = false;
    this.mainChar.setScale(4);
    this.mainChar.visible = false;

    this.wakeUpChar = () => {
      this.introSleepSprite.destroy();
      this.mainCharShow();
      this.cameras.main.shake(300, 0.02);
      utils.createTextBox(this, xPos - 340, 350, {
        wrapWidth: 470,
      }, 'lightWindow', 'mainFace', this.textFx, 'grabWeapon').start(this.mainCharText, 50);
    };

    this.grabWeaponAnim = () => {
      this.moveMainUp = () => {
        this.tweens.add({ targets: this.mainChar, duration: 900, y: 180 });
        this.mainChar.anims.play('mainCharWalkUp');
        this.redHeadChar.anims.load('redHeadWalkLeft', 1);
      };

      this.pickUpBat = () => {
        this.mainChar.anims.play('batPickUp');
        utils.createTextBox(this, xPos - 340, 350, {
          wrapWidth: 470,
        }, 'lightWindow', 'purpleSquare', this.textFx, 'goOutside').start(this.batPickUpText, 50);
        this.stepsFx.stop();

        this.getItemFx.play();
      };

      this.tweens.add({ targets: this.mainChar, duration: 3500, x: xPos - 286 });
      this.time.delayedCall(3550, this.moveMainUp, [], this);
      this.time.delayedCall(4600, this.pickUpBat, [], this);
      this.mainChar.anims.play('mainCharWalkLeft');
      this.redHeadChar.anims.load('redHeadWalkDown', 1);
      this.stepsFx.play();
    };

    this.exitRoomAnim = () => {
      this.nextScene = () => {
        utils.fadeOutScene(this, 'Town', 1500);
        this.stepsFx.destroy();
      };
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
        this.time.delayedCall(1500, this.nextScene, [], this);
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

    utils.setFullScreen(this, button);
  }
}