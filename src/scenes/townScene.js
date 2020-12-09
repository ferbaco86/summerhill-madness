import Phaser from 'phaser';
import generateMaps from '../utils/generateMaps';
import characterMov from '../utils/characterMovement';
import mainCharAnimInfo from '../assets/data/mainCharAnims.json';
import utils from '../utils/utilsFunctions';
import HudDisplay from '../objects/hudDisplay';


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

    this.fromBattle = data.fromBattle;
    this.enterHouse = () => {
      this.scene.stop('Town');
      this.scene.start('House');
    };
    this.enterSchool = () => {
      this.scene.stop('Town');
      this.scene.start('School');
    };
    const button = this.add.image(620, 390, 'maximize', 0).setScrollFactor(0);
    button.setInteractive();
    button.setDepth(30);
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.hudDisplay = new HudDisplay(this, 330, 220, 'mainFace', 'heartIcon', '100', 'starIcon', '10', 1);
    this.hudDisplay.setDepth(30);
    this.hudDisplay.setScrollFactor(0);
    const map = this.make.tilemap({ key: 'townMap' });
    const tileSet = map.addTilesetImage('tileset_master', 'tiles', 16, 16, 1, 2);
    const tileSetArr = [tileSet];
    const staticLayersArr = generateMaps.generateStaticLayers(map, ['Ground', 'Above', 'World', 'Decorators'], tileSetArr, 0, 0);
    const spawnPoint = map.findObject('Objects', obj => obj.name === 'mainHouseSpawn');
    const houseEntrance = map.findObject('Objects', obj => obj.name === 'houseEntrance');
    const schoolEntrance = map.findObject('Objects', obj => obj.name === 'schoolEntrance');
    const houseEntranceSpawn = map.findObject('Objects', obj => obj.name === 'houseEntranceSpawnPoint');
    const schoolEntranceSpawn = map.findObject('Objects', obj => obj.name === 'schoolEntrancesSpawn');
    const monsterSpawn1 = map.findObject('Objects', obj => obj.name === 'enemyTownSpawn1');
    this.moveEnemy = false;


    if (data.fromHouse === true) {
      this.mainChar = this.physics.add.sprite(houseEntranceSpawn.x, houseEntranceSpawn.y, 'mainDown', 1);
    } else if (data.fromSchool === true) {
      this.mainChar = this.physics.add.sprite(schoolEntranceSpawn.x, schoolEntranceSpawn.y, 'mainDown', 1);
    } else if (data.fromBattle === true) {
      this.mainChar = this.physics.add.sprite(data.charPosX - 30, data.charPosY - 30, 'mainDown', 1);
    } else {
      this.mainChar = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'mainDown', 1);
    }

    this.onMeetEnemy = (player, enemy) => {
      this.startBattle = () => {
        this.scene.stop('Town');
        this.scene.start('Battle', { posX: this.mainChar.x, posY: this.mainChar.y, enemyKilled: enemy.name });
      };
      this.cameras.main.shake(300, 0.02);
      this.time.delayedCall(300, this.startBattle, [], this);
    };

    this.blueSlime = this.physics.add.sprite(monsterSpawn1.x, monsterSpawn1.y, 'blueSlimeDown', 1);
    this.blueSlime.setName('blueSlime1');
    this.blueSlime.anims.play('blueSlimeWalkDown');

    generateMaps.generateCollision(this, this.blueSlime, 'World', 'Decorators', staticLayersArr, ['World', 'Decorators']);
    generateMaps.generateCollision(this, this.mainChar, 'World', 'Decorators', staticLayersArr, ['World', 'Decorators']);
    generateMaps.generateDepth(staticLayersArr, 'Above', 10);

    if (data.fromBattle === true && !data.runAway) {
      this.sys.game.globals.enemiesDefeated.forEach(enemy => {
        if (enemy === this.blueSlime.name) this.blueSlime.destroy();
      });
    }

    if ((this.sys.game.globals.enemiesDefeated.includes(this.blueSlime.name)
    && data.fromBattle === undefined) || data.runAway) {
      this.moveEnemy = true;
    }

    this.mainChar.body.setSize(this.mainChar.width, this.mainChar.height / 2, false)
      .setOffset(0, this.mainChar.height / 2);

    generateMaps.setWorld(this, map, this.mainChar, 3);
    const houseDoorway = this.physics.add.sprite(houseEntrance.x, houseEntrance.y, 'emptySprite');
    const schoolDoorway = this.physics.add.sprite(schoolEntrance.x, schoolEntrance.y, 'emptySprite');

    houseDoorway.body.setSize(10, 10);
    schoolDoorway.body.setSize(10, 10);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(this.mainChar, houseDoorway, this.enterHouse, null, this);
    this.physics.add.overlap(this.mainChar, schoolDoorway, this.enterSchool, null, this);
    this.physics.add.overlap(this.mainChar, this.blueSlime, this.onMeetEnemy, null, this);


    // this.physics.world.createDebugGraphic();

    // // Create worldLayer collision graphic above the player, but below the help text
    // const graphics = this.add
    //   .graphics()
    //   .setAlpha(0.75)
    //   .setDepth(20);
    // staticLayersArr[2].renderDebug(graphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    // });

    this.sys.events.on('wake', this.wake, this);
    utils.setFullScreen(this, button);
  }

  update() {
    characterMov.charMovementControl(this.mainChar, this.cursors, 155, 50, -50, -50, 50,
      mainCharAnimInfo, 1);
    if (!this.sys.game.globals.enemiesDefeated.includes(this.blueSlime.name)
    || this.moveEnemy === true) {
      if (Phaser.Math.Distance.Between(this.mainChar.x, this.mainChar.y,
        this.blueSlime.x, this.blueSlime.y) < 80) {
        this.physics.moveToObject(this.blueSlime, this.mainChar, 20);
      }
    }
  }
}