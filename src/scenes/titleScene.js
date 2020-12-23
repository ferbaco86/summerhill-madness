import Phaser from 'phaser';
import Button from '../objects/button';
import utils from '../utils/utilsFunctions';


export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }


  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.cameras.main.backgroundColor.setTo(255, 255, 255);
    const button = this.add.image(900, 570, 'maximize', 0).setScrollFactor(0);
    button.setInteractive();
    button.setDepth(30);
    button.setScale(3);

    // Background Pic
    this.add.image(0, 0, 'bgMenu').setOrigin(0);
    this.menuTitle = this.add.image(200, 20, 'gameTitle').setOrigin(0);


    // Game
    this.gameButton = new Button(this, 400, 200, 'button1', 'button2', 'Play', 'Welcome');

    // Options
    this.optionsButton = new Button(this, 400, 300, 'button1', 'button2', 'Sound', 'Options');

    // Credits
    this.creditsButton = new Button(this, 400, 400, 'button1', 'button2', 'Credits', 'Credits');

    // Top 5
    this.top5Button = new Button(this, 400, 500, 'button1', 'button2', 'Top 5', 'HighScores');


    utils.setFullScreen(this, button);

    if (this.sys.game.globals.bgMusic !== null) {
      this.sys.game.globals.bgMusic.stop();
    }
    utils.playBGMusic(this, 'bgMusic', 0.1, true);
  }
}