import Phaser from 'phaser';
import Button from '../objects/button';
import PopUpWindow from '../objects/popUpWindow';
import BattleMenu from '../objects/battleMenu';
import Unit from '../objects/unit';
import BattleActionMenu from '../objects/battleActionMenu';
import BattleEndWindow from '../objects/battleEndWindow';
import BattleEnemiesMenu from '../objects/battleEnemiesMenu';
import BattleEnemy from '../objects/battleEnemy';
import BattleHeroesMenu from '../objects/battleHeroesMenu';
import BattleHudDisplay from '../objects/battleHudDisplay';
import BattleMenuItem from '../objects/battleMenuItem';
import BattlePlayer from '../objects/battlePlayer';
import EventDispatcher from '../objects/eventDispatcher';
import HudDisplay from '../objects/hudDisplay';
import MainCharacter from '../objects/mainCharacter';
import Character from '../objects/character';

const johnChar = new Character(110, 110, 10, 100, 'John', 50, 100, 1);

test('BattleActionMenu inherits from BattleMenu', () => {
  expect(BattleActionMenu.prototype).toBeInstanceOf(BattleMenu);
});

test('BattleEndWindow inherits from PopUpWindow', () => {
  expect(BattleEndWindow.prototype).toBeInstanceOf(PopUpWindow);
});

test('BattleEnemiesMenu inherits from BattleMenu', () => {
  expect(BattleEnemiesMenu.prototype).toBeInstanceOf(BattleMenu);
});

test('BattleEnemy inherits from Unit', () => {
  expect(BattleEnemy.prototype).toBeInstanceOf(Unit);
});

test('BattleHeroesMenu inherits from BattleMenu', () => {
  expect(BattleHeroesMenu.prototype).toBeInstanceOf(BattleMenu);
});

test('BattleHudDisplay inherits from Phaser.GameObjects.Container', () => {
  expect(BattleHudDisplay.prototype).toBeInstanceOf(Phaser.GameObjects.Container);
});

test('BattleMenu inherits from Phaser.GameObjects.Container', () => {
  expect(BattleMenu.prototype).toBeInstanceOf(Phaser.GameObjects.Container);
});

test('BattleMenuItem inherits from Phaser.GameObjects.Text', () => {
  expect(BattleMenuItem.prototype).toBeInstanceOf(Phaser.GameObjects.Text);
});

test('BattlePlayer inherits from Unit', () => {
  expect(BattlePlayer.prototype).toBeInstanceOf(Unit);
});

test('Button inherits from Phaser.GameObjects.Container', () => {
  expect(Button.prototype).toBeInstanceOf(Phaser.GameObjects.Container);
});

test('EventDispatcher inherits from Phaser.Events.EventEmitter', () => {
  expect(EventDispatcher.prototype).toBeInstanceOf(Phaser.Events.EventEmitter);
});

test('HudDisplay inherits from Phaser.GameObjects.Container', () => {
  expect(HudDisplay.prototype).toBeInstanceOf(Phaser.GameObjects.Container);
});

test('MainCharacter inherits from Phaser.Physics.Arcade.Sprite', () => {
  expect(MainCharacter.prototype).toBeInstanceOf(Phaser.Physics.Arcade.Sprite);
});

test('PopUpWindow inherits from Phaser.GameObjects.Container', () => {
  expect(PopUpWindow.prototype).toBeInstanceOf(Phaser.GameObjects.Container);
});

test('Unit inherits from Phaser.GameObjects.Sprite', () => {
  expect(Unit.prototype).toBeInstanceOf(Phaser.GameObjects.Sprite);
});

test('Character name is John', () => {
  expect(johnChar.name).toBe('John');
});

test('Character action points to not be 0', () => {
  expect(johnChar.ap).not.toBe(0);
});
