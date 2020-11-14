import Phaser from 'phaser';

export default class TownScene extends Phaser.Scene {
  constructor() {
    super('Town');
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const map = this.make.tilemap({ key: 'townMap' });
    const tileSet = map.addTilesetImage('tileset_master', 'tiles');
    const groundLayer = map.createStaticLayer('Ground', tileSet, 0, 0);
    const worldLayer = map.createStaticLayer('World', tileSet, 0, 0);
    const aboveLayer = map.createStaticLayer('Above', tileSet, 0, 0);
    worldLayer.setCollisionByExclusion([-1]);
    // groundLayer.setScale(2)
    // worldLayer.setScale(2);
    // aboveLayer.setScale(2);
    // const spawnPoint = map.findObject('Objects', obj => obj.name === 'SpawnPoint');
    this.mainChar = this.physics.add.sprite(500, 500, 'mainDown', 1);
    // this.mainChar.setScale(2);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.mainChar.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setZoom(3).centerToBounds();
    this.cameras.main.startFollow(this.mainChar);
    this.cameras.main.roundPixels = true;
  }

  update() {
    this.mainChar.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.mainChar.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.mainChar.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.mainChar.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.mainChar.body.setVelocityY(80);
    }
  }
}
