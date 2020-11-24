import Phaser from 'phaser';
import Player from '../objects/player';


export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.scene.launch('BattleUI');
    this.add.image(0, -200, 'townBattleBG').setOrigin(0, 0).setScale(2);
    const mainChar = new Player(this, 700, 200, 'mainCharBattleStand', 1, 'Main', 100, 20);
    const redHead = new Player(this, 750, 330, 'redHeadBattleStand', 1, 'Ro', 100, 8);
  }

  update() {

  }

}