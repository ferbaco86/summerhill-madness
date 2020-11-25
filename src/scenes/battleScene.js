import Phaser from 'phaser';
import Enemy from '../objects/enemy';
import Player from '../objects/player';


export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.scene.launch('BattleUI');
    this.add.image(0, -200, 'townBattleBG').setOrigin(0, 0).setScale(2);
    const mainChar = new Player(this, 700, 200, 'mainCharBattleStand', 1, 'Player', 100, 20, 'mainFace');
    const redHead = new Player(this, 750, 330, 'redHeadBattleStand', 1, 'Ro', 100, 8, 'redHeadFace');
    const blueSlime = new Enemy(this, 100, 200, 'blueSlimeBattler', 0, 'Blue Slime', 50, 15);

    this.heroes = [mainChar, redHead];
    this.enemies = [blueSlime];
  }

  update() {

  }

}