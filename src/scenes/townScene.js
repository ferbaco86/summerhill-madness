import Phaser from 'phaser';
import generateMaps from '../utils/generateMaps';
import characterMov from '../utils/characterMovement';
import mainCharAnimInfo from '../assets/data/mainCharAnims.json';
import utils from '../utils/utilsFunctions';


export default class TownScene extends Phaser.Scene {
  constructor() {
    super('Town');
  }

  create() {
    this.enterHouse = () => {
      this.scene.stop('Town');
      this.scene.start('House');
    };
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const map = this.make.tilemap({ key: 'townMap' });

    const tileSet = map.addTilesetImage('tileset_master', 'tiles', 16, 16, 1, 2);
    const tileSetArr = [tileSet];
    const staticLayersArr = generateMaps.generateStaticLayers(map, ['Ground', 'Above', 'World', 'Decorators'], tileSetArr, 0, 0);
    const spawnPoint = map.findObject('Objects', obj => obj.name === 'mainHouseSpawn');
    const houseEntrance = map.findObject('Objects', obj => obj.name === 'houseEntrance');
    this.mainChar = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'mainDown', 1);
    generateMaps.generateCollision(this, this.mainChar, 'World', 'Decorators', staticLayersArr, ['World', 'Decorators']);
    generateMaps.generateDepth(staticLayersArr, 'Above', 10);

    this.mainChar.body.setSize(this.mainChar.width, this.mainChar.height / 2, false)
      .setOffset(0, this.mainChar.height / 2);

    generateMaps.setWorld(this, map, this.mainChar, 3);
    const entrance = this.physics.add.sprite(houseEntrance.x, houseEntrance.y, 'emptySprite');
    entrance.body.setSize(10, 10);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(this.mainChar, entrance, this.enterHouse, null, this);


    // this.physics.world.createDebugGraphic();

    // // Create worldLayer collision graphic above the player, but below the help text
    // const graphics = this.add
    //   .graphics()
    //   .setAlpha(0.75)
    //   .setDepth(20);
    // staticLayersArr[0].renderDebug(graphics, {
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