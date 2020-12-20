import Phaser from 'phaser';
import Button from '../objects/button';
import utils from '../utils/utilsFunctions';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create(data) {
    const button = this.add.image(900, 570, 'maximize', 0).setScrollFactor(0);
    button.setInteractive();
    button.setDepth(30);
    button.setScale(3);
    this.add.sprite(480, 400, 'defeated').setScale(3);
    this.add.text(100, 100, 'GAME OVER', {
      fontSize: '44px',
      fontFamily: 'pixelFont',
    });
    this.add.text(350, 200, `${data.name} You collected:`, {
      fontSize: '32px',
      fontFamily: 'pixelFont',
    });
    this.add.image(440, 275, 'moneyIcon').setScale(3);
    this.add.text(470, 255, `${data.money}`, {
      fontSize: '32px',
      fontFamily: 'pixelFont',
    });

    this.menuButton = new Button(this, 300, 500, 'button1', 'button2', 'Menu', 'Title');
    this.scoresButton = new Button(this, 500, 500, 'button1', 'button2', 'Top 5', 'TopScores');
    utils.setFullScreen(this, button);
  }
}