import Phaser from 'phaser';
import BattleEnemy from '../objects/battleEnemy';
import BattleHudDisplay from '../objects/battleHudDisplay';
import BattlePlayer from '../objects/battlePlayer';
import BattleEndWindow from '../objects/battleEndWindow';


export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  create(data) {
    const {
      posX, posY, mainName, mainHP, mainDamage, mainAP, mainSuperDamage, money,
    } = data;
    // const { posY } = data;
    this.victory = true;
    this.gameOver = true;

    this.checkEndBattle = () => {
      this.victory = true;
      this.gameOver = true;
      // if all enemies are dead we have victory
      for (let i = 0; i < this.enemies.length; i += 1) {
        if (this.enemies[i].living) this.victory = false;
      }
      // if all heroes are dead we have game over
      for (let i = 0; i < this.heroes.length; i += 1) {
        if (this.heroes[i].living) this.gameOver = false;
      }

      return this.victory || this.gameOver;
    };

    this.endBattle = () => {
      // clear state, remove sprites
      this.heroes.length = 0;
      this.enemies.length = 0;
      for (let i = 0; i < this.units.length; i += 1) {
        // link item
        this.units[i].destroy();
      }
      this.healthText.destroy();
      this.actionPointsText.destroy();
      this.units.length = 0;
      // sleep the UI
      this.scene.sleep('BattleUI');
      // return to WorldScene and stop current Battle
      if (this.victory) {
        this.victoryWindow = new BattleEndWindow(this, 350, 100, 100, 200);
        this.onKeyInput = (event) => {
          if (event.code === 'Space') {
            this.endScene();
          }
        };
        this.input.keyboard.on('keydown', this.onKeyInput, this);

        // this.time.delayedCall(3000, this.endScene, [], this);
      } else {
        console.log('Game Over');
      }
      this.endScene = () => {
        this.scene.stop('Battle');
        this.scene.start('Town', {
          fromBattle: true,
          charPosX: posX,
          charPosY: posY,
          mainHP: this.mainChar.hp,
          mainAP: this.mainChar.ap,
          mainXP: 50,
          mainDamage: this.mainChar.damage,
          mainSuperDamage: this.mainChar.abilityDamage,
          money: money + 100,
        });
      };
    };

    this.startBattle = () => {
      this.cameras.main.fadeIn(1000, 0, 0, 0);
      this.add.image(0, -200, 'townBattleBG').setOrigin(0, 0).setScale(2);
      this.mainChar = new BattlePlayer(this, 700, 200, 'mainCharBattleStand', 1, mainName, mainHP, mainDamage,
        mainSuperDamage, mainAP, 10, 'homeRun',
        'mainCharIdle', 'batHitAnim', 'mainTakeDamageAnim', 'mainEatAnim');
      this.redHead = new BattlePlayer(this, 700, 330, 'redHeadBattleStand', 1, 'Ro', 100, 10, 40, 8, 8, 'smash',
        'redHeadIdle', 'tennisHitAnim', 'redHeadTakeDamageAnim', 'redHeadEatAnim');
      const blueSlime = new BattleEnemy(this, 100, 200, 'blueSlimeBattler', 0, 'Blue Slime', 40, 10, 'blueSlimeDamageAnim', 50, 100);
      const blueSlime2 = new BattleEnemy(this, 100, 300, 'blueSlimeBattler', 0, 'Blue Slime 2', 40, 10, 'blueSlimeDamageAnim', 50, 100);
      this.healthText = new BattleHudDisplay(this, this.mainChar.x, this.mainChar.y, 'heartIcon', '');
      this.actionPointsText = new BattleHudDisplay(this, this.mainChar.x, this.mainChar.y, 'starIcon', '');
      this.heroes = [this.mainChar, this.redHead];
      this.enemies = [blueSlime, blueSlime2];
      this.units = this.heroes.concat(this.enemies);

      this.index = -1;
      this.scene.run('BattleUI');
    };


    this.nextTurn = () => {
      if (this.checkEndBattle()) {
        this.sys.game.globals.enemiesDefeated.push(data.enemyKilled);
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
      this.heroes.forEach(hero => { hero.playIdleAnimation(); });


      // if its player hero
      if (this.units[this.index] instanceof BattlePlayer) {
        this.unitsHeroes = this.units.filter(unit => unit instanceof BattlePlayer);
        this.unitsHeroes.forEach(unit => this.tweens.add({ targets: unit, duration: 500, x: 700 }));
        this.tweens.add({ targets: this.units[this.index], duration: 500, x: 650 });
        this.events.emit('PlayerSelect', this.index);
        this.healthText.setPosition(this.units[this.index].x + 60, this.units[this.index].y - 45);
        this.actionPointsText.setPosition(this.units[this.index].x + 60,
          this.units[this.index].y - 15);
        this.healthText.setHealthText(`${this.units[this.index].hp} / ${this.units[this.index].maxHP}`);
        this.actionPointsText.setHealthText(`${this.units[this.index].ap} / ${this.units[this.index].maxAP}`);
      } else { // else if its enemy unit
        // pick random hero
        let r;
        do {
          r = Math.floor(Math.random() * this.heroes.length);
        } while (!this.heroes[r].living);
        // call the enemy's attack function

        this.units[this.index].attackAnim();
        this.heroes[r].playTakeDamage();
        this.attackHeroes = () => {
          this.units[this.index].attack(this.heroes[r]);
        };
        this.time.delayedCall(600, this.attackHeroes, [], this);
        // add timer for the next turn, so will have smooth gameplay
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
      }
    };

    this.receivePlayerSelection = (action, target) => {
      if (action === 'attack') {
        this.units[this.index].playHitAnimation();
        this.enemies[target].takeDamageAnim();
        this.attackEnemies = () => {
          this.units[this.index].attack(this.enemies[target]);
        };
        this.time.delayedCall(600, this.attackEnemies, [], this);
      }
      if (action === 'ability') {
        this.attackEnemies = () => {
          this.units[this.index].ability(this.enemies[target]);
        };
        this.time.delayedCall(600, this.attackEnemies, [], this);
      }
      this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
    };

    this.exitBattle = () => {
      this.scene.sleep('BattleUI');
      this.scene.stop('Battle');
      this.scene.start('Town', {
        fromBattle: true, charPosX: posX, charPosY: posY, runAway: true,
      });
    };
    this.startBattle();
    this.sys.events.on('wake', this.startBattle, this);
  }
}