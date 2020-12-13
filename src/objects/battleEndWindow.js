import PopUpWindow from './popUpWindow';

export default class BattleEndWindow extends PopUpWindow {
  constructor(scene, x, y, xp, coins) {
    super(scene, x, y);
    this.scene = scene;
    this.xp = xp;
    this.coins = coins;
    this.winText = this.scene.add.text(this.x, this.y, 'Victory!', { font: '62px pixelFont', color: '#87EB3F' });
    this.xpText = this.scene.add.text(this.x - 80, this.y + 100, `You gained ${xp} XP`, { font: '42px pixelFont' });
    this.coinsText = this.scene.add.text(this.x - 80, this.y + 160, `You gained $${coins}`, { font: '42px pixelFont' });
    this.infoText = this.scene.add.text(this.x - 80, this.y + 270, 'Press the space bar to continue...', { font: '22px pixelFont', color: '#87EB3F' });
    this.winGroup = this.scene.add.group();
    this.winGroup.add(this.winText);
    this.winGroup.add(this.xpText);
    this.winGroup.add(this.coinsText);
    this.winGroup.add(this.infoText);
    this.winGroup.setDepth(20);
  }
}