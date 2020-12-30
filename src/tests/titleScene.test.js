import TitleScene from '../scenes/titleScene';

const scene = new TitleScene();

test('TitleScene is of type function', () => {
  expect(typeof TitleScene).toBe('function');
});

test('TitleScene key name is Title', () => {
  expect(scene.sys.config).toBe('Title');
});

test('TitleScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
