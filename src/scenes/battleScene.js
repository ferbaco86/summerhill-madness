import Phaser from 'phaser';
import BattleHudDisplay from '../objects/battleHudDisplay';
import BattlePlayer from '../objects/battlePlayer';
import BattleEndWindow from '../objects/battleEndWindow';
import utils from '../utils/utilsFunctions';


export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  create(data) {
    this.victory = true;
    this.gameOver = true;
    this.victorySound = this.sound.add('victoryFX', { volume: 0.5, loop: false });
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


    this.startBattle = () => {
      this.cameras.main.fadeIn(1000, 0, 0, 0);
      if (data.fromTown) {
        this.add.image(0, -200, 'townBattleBG').setOrigin(0, 0).setScale(2);
      } else if (data.fromHouse) {
        this.add.image(0, -200, 'houseBattleBG').setOrigin(0, 0).setScale(2);
      } else if (data.fromSchool || data.fromDemon) {
        this.add.image(0, -200, 'schoolBattleBG').setOrigin(0, 0).setScale(2);
      }
      this.mainChar = new BattlePlayer(this, 700, 140, 'mainCharBattleStand', 1, data.charsInfo.main.name, data.charsInfo.main.hp, data.charsInfo.main.maxHP,
        data.charsInfo.main.damage, data.charsInfo.main.superDamage, data.charsInfo.main.ap, 10, 'homeRun',
        'mainCharIdle', 'batHitAnim', 'mainTakeDamageAnim', 'mainEatAnim');
      this.redHead = new BattlePlayer(this, 700, 240, 'redHeadBattleStand', 1, 'Ro', data.charsInfo.redHead.hp, data.charsInfo.redHead.maxHP, data.charsInfo.redHead.damage,
        data.charsInfo.redHead.superDamage, data.charsInfo.redHead.ap, 10, 'smash',
        'redHeadIdle', 'tennisHitAnim', 'redHeadTakeDamageAnim', 'redHeadEatAnim');
      this.healthText = new BattleHudDisplay(this, this.mainChar.x, this.mainChar.y, 'heartIcon', '');
      this.actionPointsText = new BattleHudDisplay(this, this.mainChar.x, this.mainChar.y, 'starIcon', '');
      this.heroes = [this.mainChar, this.redHead];
      if (this.sys.game.globals.withDanny) {
        this.danny = new BattlePlayer(this, 700, 340, 'dannyBattleStand', 1, 'Danny', data.charsInfo.danny.hp, data.charsInfo.danny.maxHP, data.charsInfo.danny.damage,
          data.charsInfo.danny.superDamage, data.charsInfo.danny.ap, 10,
          'bigBookHit', 'dannyIdle', 'bookHitAnim', 'dannyTakeDamageAnim', 'dannyEatAnim');
        this.heroes.push(this.danny);
      }
      this.enemiesInfo = utils.selectEnemies(this, data.enemyToKill);
      this.enemies = this.enemiesInfo.enemies;
      this.units = this.heroes.concat(this.enemies);

      this.index = -1;
      this.scene.run('BattleUI');
    };


    this.endBattle = () => {
      // clear state, remove sprites
      this.heroes.length = 0;
      this.enemies.length = 0;
      for (let i = 0; i < this.units.length; i += 1) {
        this.units[i].destroy();
      }
      this.healthText.destroy();
      this.actionPointsText.destroy();
      this.units.length = 0;
      // sleep the UI
      this.scene.sleep('BattleUI');
      // return to WorldScene and stop current Battle
      if (this.victory) {
        this.sys.game.globals.enemiesDefeated.push(data.enemyToKill);
        this.victoryWindow = new BattleEndWindow(this, 350, 100,
          this.enemiesInfo.totalXP, this.enemiesInfo.totalMoney);
        this.sys.game.globals.bgMusic.stop();
        this.victorySound.play();
        this.onKeyInput = (event) => {
          if (event.code === 'Space') {
            if (data.fromTown) {
              this.endScene('Town');
            } else if (data.fromHouse) {
              this.endScene('House');
            } else if (data.fromSchool) {
              this.endScene('School');
            } else if (data.fromDemon) {
              this.endScene('Victory');
            }
          }
        };
        this.allCharsInfo = {
          main: {
            hp: this.mainChar.hp,
            maxHP: this.mainChar.maxHP,
            ap: this.mainChar.ap,
            name: this.mainChar.name,
            damage: this.mainChar.damage,
            superDamage: this.mainChar.abilityDamage,
            xp: data.charsInfo.main.xp + this.enemiesInfo.totalXP,
            level: data.charsInfo.main.level,
          },
          redHead: {
            hp: this.redHead.hp,
            maxHP: this.redHead.maxHP,
            ap: this.redHead.ap,
            damage: this.redHead.damage,
            superDamage: this.redHead.abilityDamage,
            xp: data.charsInfo.redHead.xp + this.enemiesInfo.totalXP,
          },
        };
        if (this.sys.game.globals.withDanny) {
          this.allCharsInfo.danny = {
            hp: this.danny.hp,
            maxHP: this.danny.maxHP,
            ap: this.danny.ap,
            damage: this.danny.damage,
            superDamage: this.danny.abilityDamage,
            xp: data.charsInfo.danny.xp + this.enemiesInfo.totalXP,
          };
        }
        this.input.keyboard.on('keydown', this.onKeyInput, this);
      } else {
        this.scene.stop('Battle');
        this.scene.start('GameOver', { money: data.money, name: this.mainChar.name });
      }

      this.endScene = (newScene) => {
        this.scene.stop('Battle');
        this.scene.start(newScene, {
          charPosX: data.posX,
          charPosY: data.posY,
          fromBattle: true,
          charsInfo: this.allCharsInfo,
          money: data.money + this.enemiesInfo.totalMoney,
        });
      };
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
      let newScene;
      this.scene.sleep('BattleUI');
      this.scene.stop('Battle');
      if (data.fromTown) {
        newScene = 'Town';
      } else if (data.fromHouse) {
        newScene = 'House';
      } else if (data.fromSchool) {
        newScene = 'School';
      }
      this.allCharsInfoExitBattle = {
        main: {
          hp: this.mainChar.hp,
          maxHP: this.mainChar.maxHP,
          ap: this.mainChar.ap,
          name: this.mainChar.name,
          damage: this.mainChar.damage,
          superDamage: this.mainChar.abilityDamage,
          xp: data.charsInfo.main.xp,
          level: data.charsInfo.main.level,
        },
        redHead: {
          hp: this.redHead.hp,
          maxHP: this.redHead.maxHP,
          ap: this.redHead.ap,
          damage: this.redHead.damage,
          superDamage: this.redHead.abilityDamage,
          xp: data.charsInfo.redHead.xp,
        },
      };
      if (this.sys.game.globals.withDanny) {
        this.allCharsInfoExitBattle.danny = {
          hp: this.danny.hp,
          maxHP: this.danny.maxHP,
          ap: this.danny.ap,
          damage: this.danny.damage,
          superDamage: this.danny.abilityDamage,
          xp: data.charsInfo.danny.xp,
        };
      }
      this.scene.start(newScene, {
        charPosX: data.posX,
        charPosY: data.posY,
        fromBattle: true,
        runAway: true,
        money: data.money,
        charsInfo: this.allCharsInfoExitBattle,
      });
    };
    this.startBattle();
    this.sys.events.on('wake', this.startBattle, this);


    this.sys.game.globals.bgMusic.stop();
    utils.playBGMusic(this, 'battleMusic', 0.1, true);
  }
}