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
    this.units = this.heroes.concat(this.enemies);

    this.index = -1;

    this.nextTurn = () => {
      this.index += 1;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
      if (this.units[this.index]) {
        // if its player hero
        if (this.units[this.index] instanceof Player) {
          this.events.emit('PlayerSelect', this.index);
        } else { // else if its enemy unit
          // pick random hero
          const r = Math.floor(Math.random() * this.heroes.length);
          // call the enemy's attack function
          this.units[this.index].attack(this.heroes[r]);
          // add timer for the next turn, so will have smooth gameplay
          this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
      }
    };

    this.receivePlayerSelection = (action, target) => {
      if (action === 'attack') {
        this.units[this.index].attack(this.enemies[target]);
      }
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    };
  }
}