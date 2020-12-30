
const generateMaps = (() => {
  const tilesParams = {
    tileSet1: {
      tileName: 'tileset_master',
      tileKey: 'tiles',
      tileWidth: 16,
      tileHeight: 16,
      tileMargin: 1,
      tileSpacing: 2,
    },
    tileSet2: {
      tileName: 'tileA4_walls3',
      tileKey: 'wallTiles',
      tileWidth: 16,
      tileHeight: 16,
      tileMargin: 1,
      tileSpacing: 2,
    },
  };
  const generateTilesSet = (map, tilesValues) => {
    const arrTiles = [];
    const tilesParamsValues = Object.values(tilesValues);
    tilesParamsValues.forEach(element => {
      arrTiles.push(map.addTilesetImage(element.tileName, element.tileKey, element.tileWidth,
        element.tileHeight, element.tileMargin, element.tileSpacing));
    });
    return arrTiles;
  };
  const generateStaticLayers = (map, arrLayersName, arrTiles, xPos, yPos) => {
    const arrLayers = [];
    arrLayersName.forEach(element => {
      arrLayers.push(map.createStaticLayer(element, arrTiles, xPos, yPos));
    });
    return arrLayers;
  };
  const generateCharCollision = (scene, char, arrLayers, nameLayersToCollideWith) => {
    const arrToCollideWith = [];
    arrLayers.forEach(element => {
      if (nameLayersToCollideWith.includes(element.layer.name)) {
        arrToCollideWith.push(element);
      }
    });
    scene.physics.add.collider(char, arrToCollideWith);
  };
  const generateCollision = (scene, char,
    layerNameExclusion, LayerNameCollider, arrLayers, nameLayersToCollideWidth) => {
    arrLayers.forEach(element => {
      if (element.layer.name === layerNameExclusion) {
        element.setCollisionByExclusion([-1]);
      }
      if (element.layer.name === LayerNameCollider) {
        element.setCollisionByProperty({ collider: true });
      }
    });
    generateCharCollision(scene, char, arrLayers, nameLayersToCollideWidth);
  };
  const generateDepth = (arrLayers, layerName, depth) => {
    arrLayers.forEach(element => {
      if (element.layer.name === layerName) {
        element.setDepth(depth);
      }
    });
  };
  const setWorld = (scene, map, char, zoom) => {
    char.setCollideWorldBounds(true);
    scene.physics.world.bounds.width = map.widthInPixels;
    scene.physics.world.bounds.height = map.heightInPixels;
    scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    scene.cameras.main.setZoom(zoom).centerToBounds();
    scene.cameras.main.startFollow(char);
    scene.cameras.main.roundPixels = true;
  };
  return {
    tilesParams,
    generateTilesSet,
    generateCollision,
    generateStaticLayers,
    generateDepth,
    setWorld,
  };
})();

export default generateMaps;