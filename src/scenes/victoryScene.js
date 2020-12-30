import Phaser from 'phaser';
import Button from '../objects/button';
import HighScoresAPI from '../utils/highScoresAPI';
import utils from '../utils/utilsFunctions';

export default class VictoryScene extends Phaser.Scene {
  constructor() {
    super('Victory');
  }

  create(data) {
    this.sys.game.globals.bgMusic.stop();
    this.add.image(0, 0, 'bgMenu').setOrigin(0);
    this.add.image(465, 90, 'congratsTitle').setScale(1.5);
    this.gameCompletedSound = this.sound.add('gameCompletedFX', { volume: 0.5, loop: false });
    this.gameCompletedSound.play();
    const { playerName } = this.sys.game.globals;
    const button = this.add.image(900, 570, 'maximize', 0).setScrollFactor(0);
    button.setInteractive();
    button.setDepth(30);
    button.setScale(3);
    HighScoresAPI.scores.user.user = playerName;
    HighScoresAPI.scores.user.score = data.money;
    this.charCeleb = this.add.sprite(480, 400, 'mainCeleb').setScale(3);
    this.charCeleb.play('mainCharCeleb');
    this.add.text(200, 130, 'YOU SAVED SUMMERHILL!', {
      fontSize: '44px',
      fontFamily: 'pixelFont',
    });
    this.add.text(350, 200, `${playerName} You collected:`, {
      fontSize: '32px',
      fontFamily: 'pixelFont',
    });
    this.add.image(440, 275, 'moneyIcon').setScale(3);
    this.add.text(470, 255, `$${data.money}`, {
      fontSize: '32px',
      fontFamily: 'pixelFont',
    });
    this.menuButton = new Button(this, 300, 500, 'button1', 'button2', 'Menu', 'Title');
    this.scoresButton = new Button(this, 500, 500, 'button1', 'button2', 'Top 5', 'HighScores');
    utils.setFullScreen(this, button);
    HighScoresAPI.recordScore();
  }
}