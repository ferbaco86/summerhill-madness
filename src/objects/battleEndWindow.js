import PopUpWindow from './popUpWindow';

export default class BattleEndWindow extends PopUpWindow {
  constructor(scene, x, y, xp, coins) {
    super(scene, x, y);
    this.scene = scene;
    this.xp = xp;
    this.coins = coins;
    this.winTitle = this.scene.add.image(275, 20, 'victoryTitle').setOrigin(0);
    this.xpText = this.scene.add.text(this.x - 80, this.y + 40, `You gained ${xp} XP`, { font: '42px pixelFont' });
    this.coinsText = this.scene.add.text(this.x - 80, this.y + 90, `You gained $${coins}`, { font: '42px pixelFont' });
    this.infoText = this.scene.add.text(this.x - 80, this.y + 270, 'Press the space bar to continue...', { font: '22px pixelFont', color: '#87EB3F' });
    this.winGroup = this.scene.add.group();
    this.winGroup.add(this.winTitle);
    this.winGroup.add(this.xpText);
    this.winGroup.add(this.coinsText);
    this.winGroup.add(this.infoText);
    this.winGroup.setDepth(20);
  }
}