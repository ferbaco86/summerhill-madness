import TownScene from '../scenes/townScene';

const scene = new TownScene();

test('TownScene is of type function', () => {
  expect(typeof TownScene).toBe('function');
});

test('TownScene key name is Town', () => {
  expect(scene.sys.config).toBe('Town');
});

test('TownScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
