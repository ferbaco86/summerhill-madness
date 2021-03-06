import Phaser from 'phaser';
import generateMaps from '../utils/generateMaps';
import characterMov from '../utils/characterMovement';
import mainCharAnimInfo from '../assets/data/mainCharAnims.json';
import utils from '../utils/utilsFunctions';
import Character from '../objects/character';
import MainCharacter from '../objects/mainCharacter';


export default class TownScene extends Phaser.Scene {
  constructor() {
    super('Town');
  }

  create(data) {
    this.wake = () => {
      this.cursors.left.reset();
      this.cursors.right.reset();
      this.cursors.up.reset();
      this.cursors.down.reset();
    };
    this.meetEnemyFX = this.sound.add('meetEnemyFX', { volume: 0.1, loop: false });
    this.startText = "To confirm an action you can use the SPACE key...  ...I can move on the map using the ARROW keys...   ...Danny's house is the first one North West from here, we should probably head there first";
    this.playerName = this.sys.game.globals.playerName;
    this.fromBattle = data.fromBattle;
    this.textFx = this.sound.add('textFX', {
      volume: 0.2, loop: false,
    });

    const button = this.add.image(620, 390, 'maximize', 0).setScrollFactor(0);
    button.setInteractive();
    button.setDepth(30);
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const map = this.make.tilemap({ key: 'townMap' });
    const tileSet = map.addTilesetImage('tileset_master', 'tiles', 16, 16, 1, 2);
    const tileSetArr = [tileSet];
    const staticLayersArr = generateMaps.generateStaticLayers(map, ['Ground', 'Above', 'World', 'Decorators'], tileSetArr, 0, 0);
    const chestSpawnPoint = map.findObject('Objects', obj => obj.name === 'chestTownSpawn');
    const spawnPoint = map.findObject('Objects', obj => obj.name === 'mainHouseSpawn');
    const houseEntrance = map.findObject('Objects', obj => obj.name === 'houseEntrance');
    const schoolEntrance = map.findObject('Objects', obj => obj.name === 'schoolEntrance');
    const houseEntranceSpawn = map.findObject('Objects', obj => obj.name === 'houseEntranceSpawnPoint');
    const schoolEntranceSpawn = map.findObject('Objects', obj => obj.name === 'schoolEntrancesSpawn');
    const monsterSpawn1 = map.findObject('Objects', obj => obj.name === 'enemyTownSpawn1');
    const monsterSpawn2 = map.findObject('Objects', obj => obj.name === 'enemyTownSpawn2');
    const monsterSpawn3 = map.findObject('Objects', obj => obj.name === 'enemyTownSpawn3');
    const monsterSpawn4 = map.findObject('Objects', obj => obj.name === 'enemyTownSpawn4');
    const monsterSpawn5 = map.findObject('Objects', obj => obj.name === 'enemyTownSpawn5');
    const monsterSpawn6 = map.findObject('Objects', obj => obj.name === 'enemyTownSpawn6');

    this.moveEnemy = false;


    if (data.fromHouse) {
      this.mainChar = new MainCharacter(this, houseEntranceSpawn.x, houseEntranceSpawn.y, 'mainDown', 1, 'mainFace',
        data.charsInfo.main.hp, data.charsInfo.main.ap, data.charsInfo.main.xp, this.playerName,
        data.charsInfo.main.damage, data.charsInfo.main.superDamage,
        data.charsInfo.main.maxHP, data.charsInfo.main.level, true);
      this.redHead = new Character(data.charsInfo.redHead.hp, data.charsInfo.redHead.maxHP, data.charsInfo.redHead.ap, data.charsInfo.redHead.xp, 'Ro',
        data.charsInfo.redHead.damage, data.charsInfo.redHead.superDamage,
        data.charsInfo.main.level);
      if (this.sys.game.globals.withDanny) {
        this.danny = new Character(data.charsInfo.danny.hp, data.charsInfo.danny.maxHP,
          data.charsInfo.danny.ap,
          data.charsInfo.danny.xp, 'Danny', data.charsInfo.danny.damage, data.charsInfo.danny.superDamage,
          data.charsInfo.main.level);
      }
    } else if (data.fromSchool) {
      this.mainChar = new MainCharacter(this, schoolEntranceSpawn.x, schoolEntranceSpawn.y, 'mainDown', 1, 'mainFace',
        data.charsInfo.main.hp, data.charsInfo.main.ap, data.charsInfo.main.xp, this.playerName,
        data.charsInfo.main.damage, data.charsInfo.main.superDamage,
        data.charsInfo.main.maxHP, data.charsInfo.main.level, true);
      this.redHead = new Character(data.charsInfo.redHead.hp, data.charsInfo.redHead.maxHP, data.charsInfo.redHead.ap, data.charsInfo.redHead.xp, 'Ro', data.charsInfo.redHead.damage,
        data.charsInfo.redHead.superDamage, data.charsInfo.main.level);
      if (this.sys.game.globals.withDanny) {
        this.danny = new Character(data.charsInfo.danny.hp, data.charsInfo.danny.maxHP, data.charsInfo.danny.ap, data.charsInfo.danny.xp, 'Danny', data.charsInfo.danny.damage,
          data.charsInfo.danny.superDamage, data.charsInfo.main.level);
      }
    } else if (data.fromBattle) {
      this.mainChar = new MainCharacter(this, data.charPosX, data.charPosY - 30, 'mainDown', 1, 'mainFace',
        data.charsInfo.main.hp, data.charsInfo.main.ap, data.charsInfo.main.xp, this.playerName,
        data.charsInfo.main.damage, data.charsInfo.main.superDamage,
        data.charsInfo.main.maxHP, data.charsInfo.main.level, data.runAway);
      this.redHead = new Character(data.charsInfo.redHead.hp, data.charsInfo.redHead.maxHP, data.charsInfo.redHead.ap, data.charsInfo.redHead.xp, 'Ro', data.charsInfo.redHead.damage,
        data.charsInfo.redHead.superDamage, data.charsInfo.main.level);
      if (this.sys.game.globals.withDanny) {
        this.danny = new Character(data.charsInfo.danny.hp, data.charsInfo.danny.maxHP, data.charsInfo.danny.ap, data.charsInfo.danny.xp, 'Danny', data.charsInfo.danny.damage,
          data.charsInfo.danny.superDamage, data.charsInfo.main.level);
      }
    } else {
      this.mainChar = new MainCharacter(this, spawnPoint.x, spawnPoint.y, 'mainDown', 1, 'mainFace', 110, 0, 0, this.playerName, 20, 40, 110, 1);
      this.redHead = new Character(110, 110, 0, 0, 'Ro', 20, 40, 1);
      this.textBox = utils.createTextBox(this, this.mainChar.x - 80, this.mainChar.y + 20, {
        wrapWidth: 400,
        fixedWidth: 400,
        fixedHeight: 70,
      }, 'messageBattleUI', 'mainFace', this.textFx, '26px', null, true);
      this.textBox.start(this.startText, 50);
      this.textBox.setOrigin(0);
      this.textBox.setScale(0.3, 0.3);
      this.textBox.setDepth(40);
    }

    if (data.fromHouse || data.fromBattle || data.fromSchool) {
      if (this.sys.game.globals.withDanny) {
        this.money = data.money;
        this.charStats = {
          mainHP: this.mainChar.hp,
          mainAP: this.mainChar.ap,
          mainLevel: this.mainChar.level,
          redHeadHP: this.redHead.hp,
          redHeadAP: this.redHead.ap,
          redHeadLevel: this.mainChar.level,
          dannyHP: this.danny.hp,
          dannyAP: this.danny.ap,
          dannyLevel: this.mainChar.level,
        };
      } else {
        this.money = data.money;
        this.charStats = {
          mainHP: this.mainChar.hp,
          mainAP: this.mainChar.ap,
          mainLevel: this.mainChar.level,
          redHeadHP: this.redHead.hp,
          redHeadAP: this.redHead.ap,
          redHeadLevel: this.mainChar.level,
        };
      }
    } else {
      this.money = 0;
      this.charStats = {
        mainHP: 100,
        mainAP: 0,
        mainLevel: 1,
        redHeadHP: 100,
        redHeadAP: 0,
        redHeadLevel: 1,
      };
    }
    const hud = utils.displayHudElements(this, this.money,
      this.sys.game.globals.candies, this.charStats);
    this.physics.world.enable(this.mainChar);

    this.blueSlime = utils.createMonster(this, monsterSpawn1.x, monsterSpawn1.y, 'blueSlimeDown', 1, 'blueSlime1', 'blueSlimeWalkDown');
    this.redSlime = utils.createMonster(this, monsterSpawn3.x, monsterSpawn3.y, 'redSlimeDown', 1, 'redSlime1', 'redSlimeWalkDown');
    this.snake = utils.createMonster(this, monsterSpawn2.x, monsterSpawn2.y, 'snakeDown', 1, 'snake', 'snakeWalkDown');
    this.bee = utils.createMonster(this, monsterSpawn4.x, monsterSpawn4.y, 'beeDown', 1, 'bee', 'beeWalkDown');
    this.fly = utils.createMonster(this, monsterSpawn5.x, monsterSpawn5.y, 'flyDown', 1, 'fly', 'flyWalkDown');
    this.plant = utils.createMonster(this, monsterSpawn6.x, monsterSpawn6.y, 'plantDown', 1, 'plant', 'plantWalkDown');

    this.enemyGroup = this.add.group();
    this.enemyGroup.add(this.blueSlime);
    this.enemyGroup.add(this.redSlime);
    this.enemyGroup.add(this.snake);
    this.enemyGroup.add(this.bee);
    this.enemyGroup.add(this.fly);
    this.enemyGroup.add(this.plant);

    if (!this.sys.game.globals.townChestOpened) {
      this.chest = utils.createActiveChest(this, chestSpawnPoint.x, chestSpawnPoint.y, 'chestOpen', 'chestOpenAnim',
        hud, this.money, this.charStats, this.mainChar, 6, this.textFx);
    } else {
      this.chest = this.physics.add.sprite(chestSpawnPoint.x, chestSpawnPoint.y, 'chestOpen', 3);
    }

    this.mainChar.setDepth(1);
    this.chest.body.setSize(this.chest.width, this.chest.height);
    this.chest.body.immovable = true;


    this.enemies = this.enemyGroup.getChildren();
    this.physics.add.collider(this.mainChar, this.chest);
    generateMaps.generateCollision(this, this.enemyGroup, 'World', 'Decorators', staticLayersArr, ['World', 'Decorators']);
    generateMaps.generateCollision(this, this.mainChar, 'World', 'Decorators', staticLayersArr, ['World', 'Decorators']);
    generateMaps.generateDepth(staticLayersArr, 'Above', 10);

    if (data.fromBattle) {
      this.sys.game.globals.enemiesDefeated.forEach(enemy => {
        this.enemies.forEach(townEnemy => {
          if (enemy === townEnemy.name) townEnemy.destroy();
        });
      });
    }

    this.enemies.forEach(townEnemy => {
      if ((this.sys.game.globals.enemiesDefeated.includes(townEnemy.name)
    && data.fromBattle === undefined) || data.runAway) {
        this.moveEnemy = true;
      }
    });

    this.mainChar.body.setSize(this.mainChar.width, this.mainChar.height / 2, false)
      .setOffset(0, this.mainChar.height / 2);

    generateMaps.setWorld(this, map, this.mainChar, 3);
    const houseDoorway = this.physics.add.sprite(houseEntrance.x, houseEntrance.y, 'emptySprite');
    const schoolDoorway = this.physics.add.sprite(schoolEntrance.x, schoolEntrance.y, 'emptySprite');

    houseDoorway.body.setSize(10, 10);
    schoolDoorway.body.setSize(10, 10);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.allCharsInfo = {
      main: {
        hp: this.mainChar.hp,
        maxHP: this.mainChar.maxHP,
        ap: this.mainChar.ap,
        name: this.mainChar.name,
        damage: this.mainChar.damage,
        superDamage: this.mainChar.superDamage,
        xp: this.mainChar.xp,
        level: this.mainChar.level,
      },
      redHead: {
        hp: this.redHead.hp,
        maxHP: this.redHead.maxHP,
        ap: this.redHead.ap,
        damage: this.redHead.damage,
        superDamage: this.redHead.superDamage,
        xp: this.redHead.xp,
      },
    };

    if (this.sys.game.globals.withDanny) {
      this.allCharsInfo.danny = {
        hp: this.danny.hp,
        maxHP: this.danny.maxHP,
        ap: this.danny.ap,
        damage: this.danny.damage,
        superDamage: this.danny.superDamage,
        xp: this.danny.xp,
      };
    }

    this.onMeetEnemy = (player, enemy) => {
      this.startBattle = () => {
        this.scene.stop('Town');
        this.scene.start('Battle', {
          posX: this.mainChar.x,
          posY: this.mainChar.y,
          enemyToKill: enemy.name,
          fromTown: true,
          money: this.money,
          charsInfo: this.allCharsInfo,
        });
      };
      this.meetEnemyFX.play();
      this.cameras.main.shake(300, 0.02);
      this.time.delayedCall(300, this.startBattle, [], this);
    };

    this.enterHouse = () => {
      this.scene.stop('Town');
      this.scene.start('House', {
        posX: this.mainChar.x,
        posY: this.mainChar.y,
        charsInfo: this.allCharsInfo,
        money: this.money,
      });
    };
    this.enterSchool = () => {
      this.scene.stop('Town');
      this.scene.start('School', {
        posX: this.mainChar.x,
        posY: this.mainChar.y,
        charsInfo: this.allCharsInfo,
        money: this.money,
      });
    };

    this.physics.add.overlap(this.mainChar, houseDoorway, this.enterHouse, null, this);
    this.physics.add.overlap(this.mainChar, schoolDoorway, this.enterSchool, null, this);
    this.physics.add.overlap(this.mainChar, this.enemyGroup, this.onMeetEnemy, null, this);


    this.sys.events.on('wake', this.wake, this);
    utils.setFullScreen(this, button);

    this.sys.game.globals.bgMusic.stop();
    utils.playBGMusic(this, 'townMusic', 0.1, true);
  }

  update() {
    characterMov.charMovementControl(this.mainChar, this.cursors, 155, 50, -50, -50, 50,
      mainCharAnimInfo, 1);
    this.enemies.forEach(townEnemy => {
      if (!this.sys.game.globals.enemiesDefeated.includes(townEnemy.name)
    || this.moveEnemy) {
        if (Phaser.Math.Distance.Between(this.mainChar.x, this.mainChar.y,
          townEnemy.x, townEnemy.y) < 80) {
          this.physics.moveToObject(townEnemy, this.mainChar, 20);
        }
      }
    });
  }
}
