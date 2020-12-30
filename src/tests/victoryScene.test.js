import VictoryScene from '../scenes/victoryScene';

const scene = new VictoryScene();

test('VictoryScene is of type function', () => {
  expect(typeof VictoryScene).toBe('function');
});

test('VictoryScene key name is Victory', () => {
  expect(scene.sys.config).toBe('Victory');
});

test('VictoryScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
