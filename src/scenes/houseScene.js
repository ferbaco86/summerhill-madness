import Phaser from 'phaser';
import generateMaps from '../utils/generateMaps';
import characterMov from '../utils/characterMovement';
import mainCharAnimInfo from '../assets/data/mainCharAnims.json';
import utils from '../utils/utilsFunctions';
import MainCharacter from '../objects/mainCharacter';
import Character from '../objects/character';

export default class HouseScene extends Phaser.Scene {
  constructor() {
    super('House');
  }

  create(data) {
    this.wake = () => {
      this.cursors.left.reset();
      this.cursors.right.reset();
      this.cursors.up.reset();
      this.cursors.down.reset();
    };
    this.dannyHelpText = "HEEY!! PLEASE HELP!! I'M IN MY ROOM! COME QUICK!!!";
    this.dannyTipText = "We should probably head to the SCHOOL up north and talk to the science teacher, he may have an idea of what's going on";
    this.playerName = this.sys.game.globals.playerName;

    this.exitHouse = () => {
      this.scene.stop('House');
      if (this.sys.game.globals.withDanny) {
        this.scene.start('Town', {
          fromHouse: true,
          mainHP: this.mainChar.hp,
          mainAP: this.mainChar.ap,
          mainName: this.mainChar.name,
          mainDamage: this.mainChar.damage,
          mainSuperDamage: this.mainChar.superDamage,
          mainXP: this.mainChar.xp,
          mainLevel: this.mainChar.level,
          redHeadHP: this.redHead.hp,
          redHeadAP: this.redHead.ap,
          redHeadDamage: this.redHead.damage,
          redHeadSuperDamage: this.redHead.superDamage,
          redHeadXP: this.redHead.xp,
          redHeadLevel: this.redHead.level,
          dannyHP: this.danny.hp,
          dannyAP: this.danny.ap,
          dannyDamage: this.danny.damage,
          dannySuperDamage: this.danny.superDamage,
          dannyXP: this.danny.xp,
          money: this.money,
        });
      } else {
        this.scene.start('Town', {
          fromHouse: true,
          mainHP: this.mainChar.hp,
          mainAP: this.mainChar.ap,
          mainName: this.mainChar.name,
          mainDamage: this.mainChar.damage,
          mainSuperDamage: this.mainChar.superDamage,
          mainXP: this.mainChar.xp,
          mainLevel: this.mainChar.level,
          redHeadHP: this.redHead.hp,
          redHeadAP: this.redHead.ap,
          redHeadDamage: this.redHead.damage,
          redHeadSuperDamage: this.redHead.superDamage,
          redHeadXP: this.redHead.xp,
          redHeadLevel: this.redHead.level,
          money: this.money,
        });
      }
    };
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.money = data.money;
    this.candy = this.sys.game.globals.candies;
    const mapHouse = this.make.tilemap({ key: 'houseMap' });
    const button = this.add.image(620, 390, 'maximize', 0).setScrollFactor(0);
    button.setInteractive();
    button.setDepth(30);
    this.textFx = this.sound.add('textFX', {
      volume: 0.2, loop: false,
    });
    const arrayTiles = generateMaps.generateTilesSet(mapHouse, generateMaps.tilesParams);
    const arrayLayers = generateMaps.generateStaticLayers(mapHouse, ['Ground', 'World', 'Above', 'Decorators'], arrayTiles, 0, 0);

    const charSpawnPoint = mapHouse.findObject('Objects', obj => obj.name === 'roomPlayerSpawnPoint');
    const enemySpawnPoint2 = mapHouse.findObject('Objects', obj => obj.name === 'roomEnemySpawnPoint2');
    const enemySpawnPoint3 = mapHouse.findObject('Objects', obj => obj.name === 'roomEnemySpawnPoint3');
    const dannySpawnPoint = mapHouse.findObject('Objects', obj => obj.name === 'dannySpawnPoint');
    const chestSpawnPoint = mapHouse.findObject('Objects', obj => obj.name === 'roomChestSpawnPoint');


    if (data.fromBattle) {
      if (!this.sys.game.globals.withDanny) {
        this.dannyOnFloor = this.add.sprite(dannySpawnPoint.x, dannySpawnPoint.y, 'dannyCrawl', 0);
        this.dannyOnFloor.anims.play('dannyFloorCrawl');
      }
      if (this.sys.game.globals.withDanny) {
        this.mainChar = new MainCharacter(this, data.charPosX, data.charPosY - 12, 'mainDown', 1, 'mainFace',
          data.mainHP, data.mainAP, data.mainXP, this.playerName,
          data.mainDamage, data.mainSuperDamage);
        this.redHead = new Character(data.redHeadHP, data.redHeadAP, data.redHeadXP, 'Ro', data.redHeadDamage, data.redHeadSuperDamage);

        if (this.sys.game.globals.dannyFirst) {
          this.textBox = utils.createTextBox(this,
            dannySpawnPoint.x - 150, dannySpawnPoint.y - 60, {
              wrapWidth: 400,
              fixedWidth: 400,
              fixedHeight: 70,
            }, 'messageBattleUI', 'dannyFace', this.textFx, '26px', null, true);
          this.textBox.start(this.dannyTipText, 50);
          this.textBox.setOrigin(0);
          this.textBox.setScale(0.3, 0.3);
          this.textBox.setDepth(40);
          this.sys.game.globals.dannyFirst = false;
        }
      } else {
        this.mainChar = new MainCharacter(this, data.charPosX, data.charPosY - 12, 'mainDown', 1, 'mainFace',
          data.mainHP, data.mainAP, data.mainXP, this.playerName,
          data.mainDamage, data.mainSuperDamage);
        this.redHead = new Character(data.redHeadHP, data.redHeadAP, data.redHeadXP, 'Ro', data.redHeadDamage, data.redHeadSuperDamage);
      }
    } else {
      this.mainChar = new MainCharacter(this, charSpawnPoint.x, charSpawnPoint.y - 5, 'mainUp', 1, 'mainFace',
        data.mainHP, data.mainAP, data.mainXP, this.playerName,
        data.mainDamage, data.mainSuperDamage, true);
      this.redHead = new Character(data.redHeadHP, data.redHeadAP, data.redHeadXP, 'Ro', data.redHeadDamage, data.redHeadSuperDamage);
      if (!this.sys.game.globals.withDanny) {
        this.textBox = utils.createTextBox(this, charSpawnPoint.x - 60, charSpawnPoint.y - 60, {
          wrapWidth: 400,
          fixedWidth: 400,
          fixedHeight: 70,
        }, 'messageBattleUI', 'dannyFace', this.textFx, '26px', null, true);
        this.textBox.start(this.dannyHelpText, 50);
        this.textBox.setOrigin(0);
        this.textBox.setScale(0.3, 0.3);
        this.textBox.setDepth(40);
        this.dannyOnFloor = this.add.sprite(dannySpawnPoint.x, dannySpawnPoint.y, 'dannyCrawl', 0);
        this.dannyOnFloor.anims.play('dannyFloorCrawl');
      } else {
        this.danny = new Character(data.dannyHP, data.dannyAP, data.dannyXP, 'Danny', data.dannyDamage, data.dannySuperDamage);
      }
    }

    if (this.sys.game.globals.withDanny) {
      this.charStats = {
        mainHP: data.mainHP,
        mainAP: data.mainAP,
        mainLevel: this.mainChar.level,
        redHeadHP: data.redHeadHP,
        redHeadAP: data.redHeadAP,
        redHeadLevel: this.mainChar.level,
        dannyHP: this.danny.hp,
        dannyAP: this.danny.ap,
        dannyLevel: this.mainChar.level,
      };
    } else {
      this.charStats = {
        mainHP: data.mainHP,
        mainAP: data.mainAP,
        mainLevel: this.mainChar.level,
        redHeadHP: data.redHeadHP,
        redHeadAP: data.redHeadAP,
        redHeadLevel: this.mainChar.level,
      };
    }

    const hud = utils.displayHudElements(this, this.money, this.candy, this.charStats);
    this.physics.world.enable(this.mainChar);

    this.bee = utils.createMonster(this, enemySpawnPoint2.x, enemySpawnPoint2.y, 'beeDown', 1, 'houseBee', 'beeWalkDown');
    this.flybee = utils.createMonster(this, enemySpawnPoint3.x, enemySpawnPoint3.y, 'flyDown', 1, 'houseFly', 'flyWalkDown');

    this.houseEnemyGroup = this.add.group();
    this.houseEnemyGroup.add(this.bee);
    this.houseEnemyGroup.add(this.flybee);
    this.enemies = this.houseEnemyGroup.getChildren();

    generateMaps.generateCollision(this, this.houseEnemyGroup, 'World', 'Decorators', arrayLayers, ['World', 'Decorators']);
    generateMaps.generateCollision(this, this.mainChar, 'World', 'Decorators', arrayLayers, ['World', 'Decorators']);
    generateMaps.generateDepth(arrayLayers, 'Above', 10);
    generateMaps.setWorld(this, mapHouse, this.mainChar, 3);

    this.mainChar.body.setSize(this.mainChar.width, this.mainChar.height / 2, false)
      .setOffset(0, this.mainChar.height / 2);

    this.sys.game.globals.enemiesDefeated.forEach(enemy => {
      this.enemies.forEach(houseEnemy => {
        if (enemy === houseEnemy.name) houseEnemy.destroy();
      });
    });

    this.onMeetEnemy = (player, enemy) => {
      this.startBattle = () => {
        this.scene.stop('House');
        if (enemy.name === 'houseBee') {
          this.sys.game.globals.withDanny = true;
          this.sys.game.globals.dannyFirst = true;

          this.danny = new Character(this.redHead.maxHP, this.mainChar.maxAP, this.mainChar.xp, 'Danny', this.mainChar.damage, this.mainChar.superDamage);
          this.scene.start('Battle', {
            fromHouse: true,
            posX: this.mainChar.x,
            posY: this.mainChar.y,
            enemyToKill: enemy.name,
            mainHP: this.mainChar.hp,
            mainAP: this.mainChar.ap,
            mainName: this.mainChar.name,
            mainDamage: this.mainChar.damage,
            mainSuperDamage: this.mainChar.superDamage,
            mainXP: this.mainChar.xp,
            redHeadHP: this.redHead.hp,
            redHeadAP: this.redHead.ap,
            redHeadDamage: this.redHead.damage,
            redHeadSuperDamage: this.redHead.superDamage,
            redHeadXP: this.redHead.xp,
            dannyHP: this.danny.hp,
            dannyAP: this.danny.ap,
            dannyDamage: this.danny.damage,
            dannySuperDamage: this.danny.superDamage,
            dannyXP: this.danny.xp,
            money: this.money,
          });
        } else if (this.sys.game.globals.withDanny && enemy.name !== 'houseBee') {
          this.scene.start('Battle', {
            fromHouse: true,
            posX: this.mainChar.x,
            posY: this.mainChar.y,
            enemyToKill: enemy.name,
            mainHP: this.mainChar.hp,
            mainAP: this.mainChar.ap,
            mainName: this.mainChar.name,
            mainDamage: this.mainChar.damage,
            mainSuperDamage: this.mainChar.superDamage,
            mainXP: this.mainChar.xp,
            redHeadHP: this.redHead.hp,
            redHeadAP: this.redHead.ap,
            redHeadDamage: this.redHead.damage,
            redHeadSuperDamage: this.redHead.superDamage,
            redHeadXP: this.redHead.xp,
            dannyHP: this.danny.hp,
            dannyAP: this.danny.ap,
            dannyDamage: this.danny.damage,
            dannySuperDamage: this.danny.superDamage,
            dannyXP: this.danny.xp,
            money: this.money,
          });
        } else {
          this.scene.start('Battle', {
            fromHouse: true,
            posX: this.mainChar.x,
            posY: this.mainChar.y,
            enemyToKill: enemy.name,
            mainHP: this.mainChar.hp,
            mainAP: this.mainChar.ap,
            mainName: this.mainChar.name,
            mainDamage: this.mainChar.damage,
            mainSuperDamage: this.mainChar.superDamage,
            mainXP: this.mainChar.xp,
            redHeadHP: this.redHead.hp,
            redHeadAP: this.redHead.ap,
            redHeadDamage: this.redHead.damage,
            redHeadSuperDamage: this.redHead.superDamage,
            redHeadXP: this.redHead.xp,
            money: this.money,
          });
        }
      };
      this.cameras.main.shake(300, 0.02);
      this.time.delayedCall(300, this.startBattle, [], this);
    };
    const houseExit = mapHouse.findObject('Objects', obj => obj.name === 'roomExit');

    if (!this.sys.game.globals.houseChestOpened) {
      this.chest = utils.createActiveChest(this, chestSpawnPoint.x, chestSpawnPoint.y, 'chestOpen', 'chestOpenAnim',
        hud, this.money, this.charStats, this.mainChar, 3, this.textFx);
    } else {
      this.chest = this.physics.add.sprite(chestSpawnPoint.x, chestSpawnPoint.y - 5, 'chestOpen', 3);
    }

    this.mainChar.setDepth(1);
    this.chest.body.setSize(this.chest.width, this.chest.height);
    this.chest.body.immovable = true;
    this.physics.add.collider(this.mainChar, this.chest);
    const exit = this.physics.add.sprite(houseExit.x, houseExit.y, 'emptySprite');
    exit.body.setSize(houseExit.width, houseExit.height);
    exit.setOrigin(-1, 0);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(this.mainChar, exit, this.exitHouse, null, this);
    this.physics.add.overlap(this.mainChar, this.houseEnemyGroup, this.onMeetEnemy, null, this);

    this.sys.events.on('wake', this.wake, this);
    utils.setFullScreen(this, button);
  }

  update() {
    characterMov.charMovementControl(this.mainChar, this.cursors, 155, 50, -50, -50, 50,
      mainCharAnimInfo, 1);
  }
}