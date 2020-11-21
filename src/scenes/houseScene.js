import Phaser from 'phaser';
import generateMaps from '../utils/generateMaps';

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
    const speed = 155;
    const prevVelocity = this.mainChar.body.velocity.clone();
    this.mainChar.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.mainChar.body.setVelocityX(-60);
    } else if (this.cursors.right.isDown) {
      this.mainChar.body.setVelocityX(60);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.mainChar.body.setVelocityY(-60);
    } else if (this.cursors.down.isDown) {
      this.mainChar.body.setVelocityY(60);
    }

    this.mainChar.body.velocity.normalize().scale(speed);

    if (this.cursors.left.isDown) {
      this.mainChar.anims.play('mainCharWalkLeft', true);
    } else if (this.cursors.right.isDown) {
      this.mainChar.anims.play('mainCharWalkRight', true);
    } else if (this.cursors.up.isDown) {
      this.mainChar.anims.play('mainCharWalkUp', true);
    } else if (this.cursors.down.isDown) {
      this.mainChar.anims.play('mainCharWalkDown', true);
    } else {
      this.mainChar.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0) this.mainChar.setTexture('mainLeft', 1);
      else if (prevVelocity.x > 0) this.mainChar.setTexture('mainRight', 1);
      else if (prevVelocity.y < 0) this.mainChar.setTexture('mainUp', 1);
      else if (prevVelocity.y > 0) this.mainChar.setTexture('mainDown', 1);
    }
  }
}