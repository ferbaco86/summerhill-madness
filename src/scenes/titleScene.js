import Phaser from 'phaser';
import config from '../config/config';
import Button from '../objects/button';


export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }


  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.cameras.main.setBackgroundColor('#000000');
    // Background Pic
    this.add.image(0, 0, 'bgMenu').setOrigin(0);
    this.menuTitle = this.add.image(200, 0, 'gameTitle').setOrigin(0);

    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'button1', 'button2', 'Play', 'Intro');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'button1', 'button2', 'Sound', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'button1', 'button2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.1, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}