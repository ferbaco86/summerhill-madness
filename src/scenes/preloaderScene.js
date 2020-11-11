import Phaser from 'phaser';
import bgMenu from '../assets/titleMenu.png';
import soundMenu from '../assets/soundMenu.png';
import introBG from '../assets/introScene.png';
import title from '../assets/title.png';
import redHeadFace from '../assets/redHeadFaceFrame.png';
import redWindow from '../assets/windowLight3.png';
import button1 from '../assets/ui/buttonDefault.png';
import arrowRight from '../assets/ui/arrow_point_right.png';
import button2 from '../assets/ui/buttonHover.png';
import phaserLogo from '../assets/logo.png';
import introSleeping from '../assets/sleepingSpriteAnim.png';
import redHeadWalkUp from '../assets/redHeadWalkUp.png';
import redHeadWalkRight from '../assets/redHeadWalkRight.png';
import soundOff from '../assets/ui/soundOff.png';
import soundOn from '../assets/ui/soundOn.png';
import townMusic from '../assets/TownTheme.mp3';
import '../style.css';


export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(320, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '38px pixelFont',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '28px pixelFont',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '28px pixelFont',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(330, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('button1', button1);
    this.load.image('button2', button2);
    this.load.image('nextPage', arrowRight);
    this.load.image('phaserLogo', phaserLogo);
    this.load.image('redHeadFace', redHeadFace);
    this.load.image('soundOn', soundOn);
    this.load.image('soundOff', soundOff);
    this.load.audio('bgMusic', [townMusic]);
    this.load.image('bgMenu', bgMenu);
    this.load.image('soundMenu', soundMenu);
    this.load.image('gameTitle', title);
    this.load.image('lightWindow', redWindow);
    this.load.image('introBG', introBG);
    this.load.spritesheet('introSleeping', introSleeping, {
      frameWidth: 152,
      frameHeight: 232,
    });
    this.load.spritesheet('redHeadUp', redHeadWalkUp, {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet('redHeadRight', redHeadWalkRight, {
      frameWidth: 16,
      frameHeight: 24,
    });
  }

  ready() {
    this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}