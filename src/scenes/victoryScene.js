import Phaser from 'phaser';
import Button from '../objects/button';
import HighScoresAPI from '../utils/highScoresAPI';
import utils from '../utils/utilsFunctions';

export default class VictoryScene extends Phaser.Scene {
  constructor() {
    super('Victory');
  }

  create(data) {
    const { playerName } = this.sys.game.globals;
    const button = this.add.image(900, 570, 'maximize', 0).setScrollFactor(0);
    button.setInteractive();
    button.setDepth(30);
    button.setScale(3);
    HighScoresAPI.scores.user.user = playerName;
    HighScoresAPI.scores.user.score = data.money;
    this.add.sprite(480, 400, 'defeated').setScale(3);
    this.add.text(100, 100, 'CONGRATULATIONS! YOU SAVED SUMMERHILL!', {
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
    this.scoresButton = new Button(this, 500, 500, 'button1', 'button2', 'Top 5', 'TopScores');
    utils.setFullScreen(this, button);
    HighScoresAPI.recordScore();
  }
}