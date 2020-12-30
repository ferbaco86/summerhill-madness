import WelcomeScene from '../scenes/welcomeScene';

const scene = new WelcomeScene();

test('WelcomeScene is of type function', () => {
  expect(typeof WelcomeScene).toBe('function');
});

test('WelcomeScene key name is Welcome', () => {
  expect(scene.sys.config).toBe('Welcome');
});

test('WelcomeScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
