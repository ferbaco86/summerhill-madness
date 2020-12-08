import Phaser from 'phaser';

export default class BattleEndWindow extends Phaser.GameObjects.Container {
  constructor(scene, x, y, xp, coins) {
    super(scene, x, y);
    this.scene = scene;
    this.xp = xp;
    this.coins = coins;
    this.windowBG = this.scene.add.image(this.x / 2, this.y / 2, 'winWindow');
    this.windowBG.setDepth(10);
    this.windowBG.setOrigin(0);
    this.winText = this.scene.add.text(this.x, this.y, 'Victory!', { font: '62px pixelFont', color: '#87EB3F' });
    this.xpText = this.scene.add.text(this.x - 80, this.y + 100, `You gained ${xp} XP`, { font: '42px pixelFont' });
    this.coinsText = this.scene.add.text(this.x - 80, this.y + 200, `You gained ${coins} coins`, { font: '42px pixelFont' });
    this.infoText = this.scene.add.text(this.x - 80, this.y + 270, 'Press the space bar to continue...', { font: '22px pixelFont', color: '#87EB3F' });
    this.winGroup = this.scene.add.group();
    this.winGroup.add(this.winText);
    this.winGroup.add(this.xpText);
    this.winGroup.add(this.coinsText);
    this.winGroup.add(this.infoText);
    this.winGroup.setDepth(20);
    this.scene.add.existing(this);
  }
}