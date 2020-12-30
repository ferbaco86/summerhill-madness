import IntroScene from '../scenes/introScene';

const scene = new IntroScene();

test('IntroScene is of type function', () => {
  expect(typeof IntroScene).toBe('function');
});

test('IntroScene key name is Intro', () => {
  expect(scene.sys.config).toBe('Intro');
});

test('IntroScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
