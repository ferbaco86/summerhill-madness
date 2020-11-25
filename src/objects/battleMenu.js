import Phaser from 'phaser';
import BattleMenuItem from './battleMenuItem';
import BattleAvatar from './battleAvatar';


export default class BattleMenu extends Phaser.GameObjects.Container {
  constructor(x, y, scene, heroes) {
    super(scene, x, y);
    this.menuItems = [];
    this.heroesAvatar = [];
    this.menuItemIndex = 0;
    this.heroes = heroes;
    this.x = x;
    this.y = y;
  }

  addMenuItem(action) {
    const menuItem = new BattleMenuItem(0, this.menuItems.length * 50, action, this.scene);
    this.menuItems.push(menuItem);
    this.add(menuItem);
  }

  addAvatar(texture) {
    const avatar = new BattleAvatar(this.scene, 220, this.heroesAvatar.length * 50, texture, 0, 0);
    this.heroesAvatar.push(avatar);
    this.add(avatar);
  }

  moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex -= 1;
    if (this.menuItemIndex < 0) this.menuItemIndex = this.menuItems.length - 1;
    this.menuItems[this.menuItemIndex].select();
  }

  moveSelectionDown() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex += 1;
    if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
    this.menuItems[this.menuItemIndex].select();
  }

  select(index) {
    if (!index) index = 0;
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    this.menuItems[this.menuItemIndex].select();
  }

  deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
  }

  confirm() {
    // when the player confirms his slection, do the action
  }

  clear() {
    for (let i = 0; i < this.menuItems.length; i += 1) {
      this.menuItems[i].destroy();
    }
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
    for (let i = 0; i < this.heroesAvatar.length; i += 1) {
      this.heroesAvatar[i].destroy();
    }
  }

  remap(units) {
    this.clear();
    for (let i = 0; i < units.length; i += 1) {
      const unit = units[i];
      this.addMenuItem(unit.type);
      this.addAvatar(unit.avatar);
    }
  }
}