import Phaser from 'phaser';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Welcome');
  }

  create() {
    this.add.image(180, 150, 'winWindow').setOrigin(0);
    this.add.text(220, 200, "Welcome to SummerHill Player what's your name?", {
      fontSize: '34px',
      fontFamily: 'pixelFont',
      wordWrap: { width: 560 },
      align: 'justify', // 'left'|'center'|'right'|'justify'
    }).setOrigin(0);
    this.add.text(270, 420, 'After entering your name press enter to start your adventure', {
      fontSize: '12px',
      fontFamily: 'pixelFont',
      wordWrap: { width: 560 },
      color: '#87EB3F',
    }).setOrigin(0);
    const inputText = this.add.rexInputText(480, 360, 300, 40, {
      type: 'text',
      placeholder: 'Enter your name here...',
      fontSize: '16px',
      fontFamily: 'pixelFont',
      borderColor: '#ffffff',
      border: 3,
      paddingLeft: '10px',
      paddingRight: '10px',
    }).setOrigin(0.5);

    this.input.keyboard.addKey('ENTER').on('down', () => {
      this.sys.game.globals.playerName = inputText.text;
      this.scene.stop('Welcome');
      this.scene.start('Intro');
    });
  }
}