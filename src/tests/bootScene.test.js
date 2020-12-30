import BootScene from '../scenes/bootScene';

const scene = new BootScene();

test('BootScene is of type function', () => {
  expect(typeof BootScene).toBe('function');
});

test('BootScene key name is Boot', () => {
  expect(scene.sys.config).toBe('Boot');
});

test('BootScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});