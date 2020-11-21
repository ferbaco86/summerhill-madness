import Phaser from 'phaser';
import generateMaps from '../utils/generateMaps';
import characterMov from '../utils/characterMovement';
import mainCharAnimInfo from '../assets/data/mainCharAnims.json';

export default class HouseScene extends Phaser.Scene {
  constructor() {
    super('House');
  }

  create() {
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
    this.mainChar = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'mainUp', 1);

    generateMaps.generateCollision(this, this.mainChar, 'World', 'Decorators', arrayLayers, ['World', 'Decorators']);
    generateMaps.generateDepth(arrayLayers, 'Above', 10);
    generateMaps.setWorld(this, mapHouse, this.mainChar, 3);

    this.mainChar.body.setSize(this.mainChar.width, this.mainChar.height / 2, false)
      .setOffset(0, this.mainChar.height / 2);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    characterMov.charMovementControl(this.mainChar, this.cursors, 155, 50, -50, -50, 50,
      mainCharAnimInfo, 1);
  }
}