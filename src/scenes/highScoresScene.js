import Phaser from 'phaser';
import Button from '../objects/button';
import HighScoresAPI from '../utils/highScoresAPI';
import utils from '../utils/utilsFunctions';

export default class HighScoresScene extends Phaser.Scene {
  constructor() {
    super('HighScores');
  }

  create() {
    this.cameras.main.setBackgroundColor('#0f9200');
    const button = this.add.image(900, 570, 'maximize', 0).setScrollFactor(0);
    const windowFrame = this.add.image(490, 300, 'winWindow');
    windowFrame.setScale(0.5, 0.8);
    button.setInteractive();
    button.setDepth(30);
    button.setScale(3);
    this.add.text(100, 100, 'TOP MONEY EARNERS', {
      fontSize: '44px',
      fontFamily: 'pixelFont',
    });

    this.add.image(480, 180, 'moneyIcon').setScale(3);
    this.menuButton = new Button(this, 400, 500, 'button1', 'button2', 'Menu', 'Title');
    utils.setFullScreen(this, button);
    HighScoresAPI.getHighScores()
      .then(() => {
        let tab = 0;
        HighScoresAPI.scores.topscores.forEach(element => {
          this.add.text(400, 230 + tab, `${tab / 24 + 1}.- ${element.user}: $${element.score}`,
            { fontSize: '22px', fontFamily: 'pixelFont', fill: '#FFF' });
          tab += 24;
        });
      })
      .catch(e => this.add.text(16, 300, e, { fontSize: '16px', fontFamily: 'pixelFont', fill: '#FFF' }));
  }
}