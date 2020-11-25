import Phaser from 'phaser';
import Enemy from '../objects/enemy';
import Player from '../objects/player';


export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  create() {
    this.checkEndBattle = () => {
      let victory = true;
      // if all enemies are dead we have victory
      for (let i = 0; i < this.enemies.length; i += 1) {
        if (this.enemies[i].living) victory = false;
      }
      let gameOver = true;
      // if all heroes are dead we have game over
      for (let i = 0; i < this.heroes.length; i += 1) {
        if (this.heroes[i].living) gameOver = false;
      }
      return victory || gameOver;
    };

    this.endBattle = () => {
      // clear state, remove sprites
      this.heroes.length = 0;
      this.enemies.length = 0;
      for (let i = 0; i < this.units.length; i += 1) {
        // link item
        this.units[i].destroy();
      }
      this.units.length = 0;
      // sleep the UI
      this.scene.sleep('BattleUI');
      // return to WorldScene and sleep current BattleScene
      this.scene.switch('Town');
    };

    this.startBattle = () => {
      this.cameras.main.fadeIn(1000, 0, 0, 0);
      this.add.image(0, -200, 'townBattleBG').setOrigin(0, 0).setScale(2);
      const mainChar = new Player(this, 700, 200, 'mainCharBattleStand', 1, 'Player', 100, 20, 'mainFace');
      const redHead = new Player(this, 700, 330, 'redHeadBattleStand', 1, 'Ro', 100, 8, 'redHeadFace');
      const blueSlime = new Enemy(this, 100, 200, 'blueSlimeBattler', 0, 'Blue Slime', 50, 15);
      mainChar.anims.play('mainCharIdle');
      redHead.anims.play('redHeadIdle');

      this.heroes = [mainChar, redHead];
      this.enemies = [blueSlime];
      this.units = this.heroes.concat(this.enemies);

      this.index = -1;
      this.scene.run('BattleUI');
    };


    this.nextTurn = () => {
      if (this.checkEndBattle()) {
        this.endBattle();
        return;
      }
      do {
        this.index += 1;
        // if there are no more units, we start again from the first one
        if (this.index >= this.units.length) {
          this.index = 0;
        }
      } while (!this.units[this.index].living);


      // if its player hero
      if (this.units[this.index] instanceof Player) {
        this.unitsCopy = this.units.filter(unit => unit instanceof Player);
        this.unitsCopy.forEach(unit => this.tweens.add({ targets: unit, duration: 500, x: 700 }));
        // this.tweens.add({ targets: this.units, duration: 500, x: 700 });
        this.tweens.add({ targets: this.units[this.index], duration: 500, x: 650 });
        this.events.emit('PlayerSelect', this.index);
      } else { // else if its enemy unit
        // pick random hero
        let r;
        do {
          r = Math.floor(Math.random() * this.heroes.length);
        } while (!this.heroes[r].living);
        // call the enemy's attack function
        this.units[this.index].attack(this.heroes[r]);
        // add timer for the next turn, so will have smooth gameplay
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
      }
    };

    this.receivePlayerSelection = (action, target) => {
      if (action === 'attack') {
        this.units[this.index].attack(this.enemies[target]);
      }
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    };

    this.exitBattle = () => {
      this.scene.sleep('BattleUI');
      this.scene.switch('Town');
    };
    this.startBattle();
    this.sys.events.on('wake', this.startBattle, this);
  }
}