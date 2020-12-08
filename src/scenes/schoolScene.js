import Phaser from 'phaser';
import generateMaps from '../utils/generateMaps';
import characterMov from '../utils/characterMovement';
import mainCharAnimInfo from '../assets/data/mainCharAnims.json';
import utils from '../utils/utilsFunctions';

export default class SchoolScene extends Phaser.Scene {
  constructor() {
    super('School');
  }

  create() {
    this.exitSchool = () => {
      this.scene.stop('School');
      this.scene.start('Town', { fromSchool: true });
    };
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    const button = this.add.image(620, 390, 'maximize', 0).setScrollFactor(0);
    button.setInteractive();
    button.setDepth(30);
    const mapSchool = this.make.tilemap({ key: 'schoolMap' });

    const arrayTiles = generateMaps.generateTilesSet(mapSchool, generateMaps.tilesParams);
    const arrayLayers = generateMaps.generateStaticLayers(mapSchool, ['Ground', 'World', 'Above', 'Decorators'], arrayTiles, 0, 0);

    const spawnPoint = mapSchool.findObject('Objects', obj => obj.name === 'schoolPlayerSpawnPoint');
    this.mainChar = this.physics.add.sprite(spawnPoint.x, spawnPoint.y - 5, 'mainUp', 1);

    generateMaps.generateCollision(this, this.mainChar, 'World', 'Decorators', arrayLayers, ['World', 'Decorators']);
    generateMaps.generateDepth(arrayLayers, 'Above', 10);
    generateMaps.setWorld(this, mapSchool, this.mainChar, 3);

    this.mainChar.body.setSize(this.mainChar.width, this.mainChar.height / 2, false)
      .setOffset(0, this.mainChar.height / 2);

    const schoolExit = mapSchool.findObject('Objects', obj => obj.name === 'schoolExit');

    const exit = this.physics.add.sprite(schoolExit.x, schoolExit.y, 'emptySprite');
    exit.body.setSize(schoolExit.width, schoolExit.height);
    exit.setOrigin(-1, 0);


    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(this.mainChar, exit, this.exitSchool, null, this);
    // this.physics.world.createDebugGraphic();

    // // Create worldLayer collision graphic above the player, but below the help text
    // const graphics = this.add
    //   .graphics()
    //   .setAlpha(0.75)
    //   .setDepth(20);
    // arrayLayers[1].renderDebug(graphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    // });
    utils.setFullScreen(this, button);
  }

  update() {
    characterMov.charMovementControl(this.mainChar, this.cursors, 155, 50, -50, -50, 50,
      mainCharAnimInfo, 1);
  }
}