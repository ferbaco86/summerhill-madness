import BattleUIScene from '../scenes/battleUIScene';

const scene = new BattleUIScene();

test('BattleUIScene is of type function', () => {
  expect(typeof BattleUIScene).toBe('function');
});

test('BattleUIScene key name is BattleUI', () => {
  expect(scene.sys.config).toBe('BattleUI');
});

test('BattleUIScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
