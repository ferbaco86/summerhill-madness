import Phaser from 'phaser';

export default class TownScene extends Phaser.Scene {
  constructor() {
    super('Town');
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const map = this.make.tilemap({ key: 'townMap' });
    const tileSet = map.addTilesetImage('tileset_master', 'tiles', 16, 16, 1, 2);
    map.createStaticLayer('Ground', tileSet, 0, 0);
    const aboveLayer = map.createStaticLayer('Above', tileSet, 0, 0);
    const worldLayer = map.createStaticLayer('World', tileSet, 0, 0);
    const decorationsLayer = map.createStaticLayer('Decorators', tileSet, 0, 0);
    worldLayer.setCollisionByExclusion([-1]);
    decorationsLayer.setCollisionByProperty({ collider: true });
    aboveLayer.setDepth(10);
    // obstaclesLayer.setDepth(20);
    const spawnPoint = map.findObject('Objects', obj => obj.name === 'mainHouseSpawn');
    this.mainChar = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'mainDown', 1);

    this.mainChar.body.setSize(this.mainChar.width, this.mainChar.height / 2, false)
      .setOffset(0, this.mainChar.height / 2);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.mainChar.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setZoom(3).centerToBounds();
    this.cameras.main.startFollow(this.mainChar);
    this.cameras.main.roundPixels = true;

    this.physics.add.collider(this.mainChar, [worldLayer, decorationsLayer]);

    // this.physics.world.createDebugGraphic();

    // // Create worldLayer collision graphic above the player, but below the help text
    // const graphics = this.add
    //   .graphics()
    //   .setAlpha(0.75)
    //   .setDepth(20);
    // worldLayer.renderDebug(graphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });
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
