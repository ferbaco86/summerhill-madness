import HouseScene from '../scenes/houseScene';

const scene = new HouseScene();

test('HouseScene is of type function', () => {
  expect(typeof HouseScene).toBe('function');
});

test('HouseScene key name is House', () => {
  expect(scene.sys.config).toBe('House');
});

test('HouseScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
