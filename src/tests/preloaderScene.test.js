import PreloaderScene from '../scenes/preloaderScene';

const scene = new PreloaderScene();

test('PreloaderScene is of type function', () => {
  expect(typeof PreloaderScene).toBe('function');
});

test('PreloaderScene key name is Preloader', () => {
  expect(scene.sys.config).toBe('Preloader');
});

test('PreloaderScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
