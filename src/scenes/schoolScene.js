import Phaser from 'phaser';
import generateMaps from '../utils/generateMaps';
import characterMov from '../utils/characterMovement';
import mainCharAnimInfo from '../assets/data/mainCharAnims.json';
import utils from '../utils/utilsFunctions';
import MainCharacter from '../objects/mainCharacter';
import Character from '../objects/character';

export default class SchoolScene extends Phaser.Scene {
  constructor() {
    super('School');
  }

  create(data) {
    this.exitSchool = () => {
      this.scene.stop('School');
      if (this.sys.game.globals.withDanny) {
        this.scene.start('Town', {
          fromSchool: true,
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
          fromSchool: true,
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

    const button = this.add.image(620, 390, 'maximize', 0).setScrollFactor(0);
    button.setInteractive();
    button.setDepth(30);
    const mapSchool = this.make.tilemap({ key: 'schoolMap' });

    const arrayTiles = generateMaps.generateTilesSet(mapSchool, generateMaps.tilesParams);
    const arrayLayers = generateMaps.generateStaticLayers(mapSchool, ['Ground', 'World', 'Above', 'Decorators'], arrayTiles, 0, 0);

    const schoolEntranceSpawn = mapSchool.findObject('Objects', obj => obj.name === 'schoolPlayerSpawnPoint');
    const enemySpawnPoint1 = mapSchool.findObject('Objects', obj => obj.name === 'schoolEnemySpawnPoint1');
    const enemySpawnPoint2 = mapSchool.findObject('Objects', obj => obj.name === 'schoolEnemySpawnPoint2');
    const enemySpawnPoint3 = mapSchool.findObject('Objects', obj => obj.name === 'schoolEnemySpawnPoint3');
    const enemySpawnPoint4 = mapSchool.findObject('Objects', obj => obj.name === 'schoolEnemySpawnPoint4');
    const enemySpawnPoint5 = mapSchool.findObject('Objects', obj => obj.name === 'schoolEnemySpawnPoint5');


    if (data.fromBattle) {
      if (this.sys.game.globals.withDanny) {
        this.mainChar = new MainCharacter(this, data.charPosX - 30, data.charPosY - 30, 'mainDown', 1, 'mainFace',
          data.mainHP, data.mainAP, data.mainXP, this.playerName,
          data.mainDamage, data.mainSuperDamage, data.runAway);
        this.redHead = new Character(data.redHeadHP, data.redHeadAP, data.redHeadXP, 'Ro', data.redHeadDamage, data.redHeadSuperDamage);
        this.danny = new Character(data.dannyHP, data.dannyAP, data.dannyXP, 'Danny', data.dannyDamage, data.dannySuperDamage);
      } else {
        this.mainChar = new MainCharacter(this, data.charPosX - 30, data.charPosY - 30, 'mainDown', 1, 'mainFace',
          data.mainHP, data.mainAP, data.mainXP, this.playerName,
          data.mainDamage, data.mainSuperDamage, data.runAway);
        this.redHead = new Character(data.redHeadHP, data.redHeadAP, data.redHeadXP, 'Ro', data.redHeadDamage, data.redHeadSuperDamage);
      }
    } else if (this.sys.game.globals.withDanny) {
      this.mainChar = new MainCharacter(this, schoolEntranceSpawn.x + 5, schoolEntranceSpawn.y + 5, 'mainUp', 1, 'mainFace',
        data.mainHP, data.mainAP, data.mainXP, this.playerName,
        data.mainDamage, data.mainSuperDamage, true);
      this.redHead = new Character(data.redHeadHP, data.redHeadAP, data.redHeadXP, 'Ro', data.redHeadDamage, data.redHeadSuperDamage);
      this.danny = new Character(data.dannyHP, data.dannyAP, data.dannyXP, 'Danny', data.dannyDamage, data.dannySuperDamage);
    } else {
      this.mainChar = new MainCharacter(this, schoolEntranceSpawn.x + 5, schoolEntranceSpawn.y + 5, 'mainUp', 1, 'mainFace',
        data.mainHP, data.mainAP, data.mainXP, this.playerName,
        data.mainDamage, data.mainSuperDamage, true);
      this.redHead = new Character(data.redHeadHP, data.redHeadAP, data.redHeadXP, 'Ro', data.redHeadDamage, data.redHeadSuperDamage);
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
    this.physics.world.enable(this.mainChar);
    utils.displayHudElements(this, this.money, this.candy, this.charStats);

    this.snakeFly = utils.createMonster(this, enemySpawnPoint1.x, enemySpawnPoint1.y, 'snakeDown', 1, 'schoolSnake', 'snakeWalkDown');
    this.plantSlime = utils.createMonster(this, enemySpawnPoint2.x, enemySpawnPoint2.y, 'plantDown', 1, 'schoolPlant', 'plantWalkDown');
    this.blueRedSlime = utils.createMonster(this, enemySpawnPoint3.x, enemySpawnPoint3.y, 'redSlimeDown', 1, 'schoolRedSlime', 'redSlimeWalkDown');
    this.fly = utils.createMonster(this, enemySpawnPoint4.x, enemySpawnPoint4.y, 'flyDown', 1, 'schoolFly', 'flyWalkDown');
    this.bee = utils.createMonster(this, enemySpawnPoint5.x, enemySpawnPoint5.y, 'beeDown', 1, 'schoolBee', 'beeWalkDown');


    this.schoolEnemyGroup = this.add.group();
    this.schoolEnemyGroup.add(this.snakeFly);
    this.schoolEnemyGroup.add(this.plantSlime);
    this.schoolEnemyGroup.add(this.blueRedSlime);
    this.schoolEnemyGroup.add(this.fly);
    this.schoolEnemyGroup.add(this.bee);
    this.enemies = this.schoolEnemyGroup.getChildren();

    generateMaps.generateCollision(this, this.schoolEnemyGroup, 'World', 'Decorators', arrayLayers, ['World', 'Decorators']);
    generateMaps.generateCollision(this, this.mainChar, 'World', 'Decorators', arrayLayers, ['World', 'Decorators']);
    generateMaps.generateDepth(arrayLayers, 'Above', 10);
    generateMaps.setWorld(this, mapSchool, this.mainChar, 3);


    this.mainChar.body.setSize(this.mainChar.width, this.mainChar.height / 2, false)
      .setOffset(0, this.mainChar.height / 2);

    const schoolExit = mapSchool.findObject('Objects', obj => obj.name === 'schoolExit');


    const exit = this.physics.add.sprite(schoolExit.x, schoolExit.y, 'emptySprite');
    exit.body.setSize(schoolExit.width, schoolExit.height);
    exit.setOrigin(-1, 0);

    this.sys.game.globals.enemiesDefeated.forEach(enemy => {
      this.enemies.forEach(schoolEnemy => {
        if (enemy === schoolEnemy.name) schoolEnemy.destroy();
      });
    });

    this.onMeetEnemy = (player, enemy) => {
      this.startBattle = () => {
        this.scene.stop('School');
        if (this.sys.game.globals.withDanny) {
          this.scene.start('Battle', {
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
            fromSchool: true,
            money: this.money,
          });
        } else {
          this.scene.start('Battle', {
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
            fromSchool: true,
            money: this.money,
          });
        }
      };
      this.cameras.main.shake(300, 0.02);
      this.time.delayedCall(300, this.startBattle, [], this);
    };

    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(this.mainChar, exit, this.exitSchool, null, this);
    this.physics.add.overlap(this.mainChar, this.schoolEnemyGroup, this.onMeetEnemy, null, this);

    utils.setFullScreen(this, button);
  }

  update() {
    characterMov.charMovementControl(this.mainChar, this.cursors, 155, 50, -50, -50, 50,
      mainCharAnimInfo, 1);
  }
}