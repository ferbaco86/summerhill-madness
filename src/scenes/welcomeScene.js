import Phaser from 'phaser';
import utils from '../utils/utilsFunctions';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Welcome');
  }

  create() {
    this.cameras.main.setBackgroundColor('#0f9200');
    this.add.image(180, 150, 'winWindow').setOrigin(0);
    const button = this.add.image(900, 570, 'maximize', 0).setScrollFactor(0);
    button.setInteractive();
    button.setDepth(30);
    button.setScale(3);
    this.add.text(220, 200, "Welcome to SummerHill Player what's your name?", {
      fontSize: '34px',
      fontFamily: 'pixelFont',
      wordWrap: { width: 560 },
      align: 'justify', // 'left'|'center'|'right'|'justify'
    }).setOrigin(0);
    this.add.text(260, 420, 'After entering your name press enter to start your adventure', {
      fontSize: '14px',
      fontFamily: 'pixelFont',
      wordWrap: { width: 560 },
      color: '#87EB3F',
    }).setOrigin(0);
    const inputText = this.add.rexInputText(480, 360, 300, 40, {
      type: 'text',
      placeholder: 'Enter your name here...',
      fontSize: '18px',
      fontFamily: 'pixelFont',
      borderColor: '#ffffff',
      border: 3,
      paddingLeft: '10px',
      paddingRight: '10px',
    }).setOrigin(0.5);

    utils.setFullScreen(this, button);

    this.input.keyboard.addKey('ENTER').on('down', () => {
      if (inputText.text === '') {
        this.add.text(220, 100, "I don't believe you don't have a name. Please enter it", {
          fontFamily: 'pixelFont',
        });
      } else {
        this.sys.game.globals.playerName = inputText.text;
        this.scene.stop('Welcome');
        this.scene.start('Intro');
      }
    });
  }
}