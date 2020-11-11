import Phaser from 'phaser';
import Button from '../objects/button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }


  create() {
    this.model = this.sys.game.globals.model;


    this.add.image(0, 0, 'soundMenu').setOrigin(0);
    this.text = this.add.text(400, 100, 'Options', { font: '62px pixelFont' });
    this.musicButton = this.add.image(310, 220, 'soundOn');
    this.musicText = this.add.text(360, 190, 'Music Enabled', { font: '42px pixelFont' });

    this.soundButton = this.add.image(310, 320, 'soundOn');
    this.soundText = this.add.text(360, 290, 'Sound Enabled', { font: '42px pixelFont' });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    });

    this.updateAudio();
    this.menuButton = new Button(this, 490, 500, 'button1', 'button2', 'Menu', 'Title');
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

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('soundOff');
    } else {
      this.soundButton.setTexture('soundOn');
    }
  }
}