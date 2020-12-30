import BattleScene from '../scenes/battleScene';

const scene = new BattleScene();

test('BattleScene is of type function', () => {
  expect(typeof BattleScene).toBe('function');
});

test('BattleScene key name is Battle', () => {
  expect(scene.sys.config).toBe('Battle');
});

test('BattleScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
