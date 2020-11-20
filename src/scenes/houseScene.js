import Phaser from 'phaser';

export default class HouseScene extends Phaser.Scene {
  constructor() {
    super('House');
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const mapHouse = this.make.tilemap({ key: 'houseMap' });
    const masterTileSet = mapHouse.addTilesetImage('tileset_master', 'tiles', 16, 16, 1, 2);
    const wallsTileSet = mapHouse.addTilesetImage('tileA4_walls3', 'wallTiles', 16, 16, 1, 2);
    const arrayTiles = [masterTileSet, wallsTileSet];
    mapHouse.createStaticLayer('Ground', arrayTiles, 0, 0);
    const aboveLayer = mapHouse.createStaticLayer('Above', arrayTiles, 0, 0);
    const worldLayer = mapHouse.createStaticLayer('World', arrayTiles, 0, 0);
    const decorationsLayer = mapHouse.createStaticLayer('Decorators', arrayTiles, 0, 0);
    worldLayer.setCollisionByExclusion([-1]);
    decorationsLayer.setCollisionByProperty({ collider: true });
    aboveLayer.setDepth(10);
    // obstaclesLayer.setDepth(20);
    const spawnPoint = mapHouse.findObject('Objects', obj => obj.name === 'roomPlayerSpawnPoint');
    this.mainChar = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'mainUp', 1);

    this.mainChar.body.setSize(this.mainChar.width, this.mainChar.height / 2, false)
      .setOffset(0, this.mainChar.height / 2);

    this.physics.world.bounds.width = mapHouse.widthInPixels;
    this.physics.world.bounds.height = mapHouse.heightInPixels;
    this.mainChar.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBounds(0, 0, mapHouse.widthInPixels, mapHouse.heightInPixels);
    this.cameras.main.setZoom(3).centerToBounds();
    this.cameras.main.startFollow(this.mainChar);
    this.cameras.main.roundPixels = true;

    this.physics.add.collider(this.mainChar, [worldLayer, decorationsLayer]);
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