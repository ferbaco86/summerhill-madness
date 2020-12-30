import OptionsScene from '../scenes/optionsScene';

const scene = new OptionsScene();

test('OptionsScene is of type function', () => {
  expect(typeof OptionsScene).toBe('function');
});

test('OptionsScene key name is Options', () => {
  expect(scene.sys.config).toBe('Options');
});

test('OptionsScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
