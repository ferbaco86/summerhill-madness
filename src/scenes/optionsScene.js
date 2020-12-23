import Phaser from 'phaser';
import Button from '../objects/button';
import utils from '../utils/utilsFunctions';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }


  create() {
    this.model = this.sys.game.globals.model;


    this.add.image(0, 0, 'bgMenu').setOrigin(0);
    const button = this.add.image(900, 570, 'maximize', 0).setScrollFactor(0);
    button.setInteractive();
    button.setDepth(30);
    button.setScale(3);
    this.add.image(465, 80, 'soundTitle');
    this.musicButton = this.add.image(310, 220, 'soundOn');
    this.musicText = this.add.text(360, 190, 'Music Enabled', { font: '42px pixelFont' });


    this.musicButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.updateAudio();
    this.menuButton = new Button(this, 400, 500, 'button1', 'button2', 'Menu', 'Title');
    utils.setFullScreen(this, button);
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('soundOff');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('soundOn');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
  }
}