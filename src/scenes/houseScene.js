import Phaser from 'phaser';
import generateMaps from '../utils/generateMaps';
import characterMov from '../utils/characterMovement';
import mainCharAnimInfo from '../assets/data/mainCharAnims.json';

export default class HouseScene extends Phaser.Scene {
  constructor() {
    super('House');
  }

  create() {
    this.exitHouse = () => {
      this.scene.stop('House');
      this.scene.start('Town', { fromHouse: true });
    };
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const mapHouse = this.make.tilemap({ key: 'houseMap' });
    generateMaps.tilesParams.tileSet1.tileName = 'tileset_master';
    generateMaps.tilesParams.tileSet1.tileKey = 'tiles';
    generateMaps.tilesParams.tileSet1.tileWidth = 16;
    generateMaps.tilesParams.tileSet1.tileHeight = 16;
    generateMaps.tilesParams.tileSet1.tileMargin = 1;
    generateMaps.tilesParams.tileSet1.tileSpacing = 2;
    generateMaps.tilesParams.tileSet2 = {};
    generateMaps.tilesParams.tileSet2.tileName = 'tileA4_walls3';
    generateMaps.tilesParams.tileSet2.tileKey = 'wallTiles';
    generateMaps.tilesParams.tileSet2.tileWidth = 16;
    generateMaps.tilesParams.tileSet2.tileHeight = 16;
    generateMaps.tilesParams.tileSet2.tileMargin = 1;
    generateMaps.tilesParams.tileSet2.tileSpacing = 2;


    const arrayTiles = generateMaps.generateTilesSet(mapHouse, generateMaps.tilesParams);
    const arrayLayers = generateMaps.generateStaticLayers(mapHouse, ['Ground', 'World', 'Above', 'Decorators'], arrayTiles, 0, 0);

    const spawnPoint = mapHouse.findObject('Objects', obj => obj.name === 'roomPlayerSpawnPoint');
    this.mainChar = this.physics.add.sprite(spawnPoint.x, spawnPoint.y - 5, 'mainUp', 1);

    generateMaps.generateCollision(this, this.mainChar, 'World', 'Decorators', arrayLayers, ['World', 'Decorators']);
    generateMaps.generateDepth(arrayLayers, 'Above', 10);
    generateMaps.setWorld(this, mapHouse, this.mainChar, 3);

    this.mainChar.body.setSize(this.mainChar.width, this.mainChar.height / 2, false)
      .setOffset(0, this.mainChar.height / 2);

    const houseExit = mapHouse.findObject('Objects', obj => obj.name === 'roomExit');

    const exit = this.physics.add.sprite(houseExit.x, houseExit.y, 'emptySprite');
    exit.body.setSize(houseExit.width, houseExit.height);
    exit.setOrigin(-1, 0);


    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(this.mainChar, exit, this.exitHouse, null, this);
    this.physics.world.createDebugGraphic();

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
  }

  update() {
    characterMov.charMovementControl(this.mainChar, this.cursors, 155, 50, -50, -50, 50,
      mainCharAnimInfo, 1);
  }
}