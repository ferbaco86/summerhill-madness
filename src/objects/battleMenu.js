import Phaser from 'phaser';
import BattleMenuItem from './battleMenuItem';
import BattleAvatar from './battleAvatar';
import Player from './player';


export default class BattleMenu extends Phaser.GameObjects.Container {
  constructor(x, y, scene, heroes) {
    super(scene, x, y);
    this.menuItems = [];
    this.heroesAvatar = [];
    this.menuItemIndex = 0;
    this.heroes = heroes;
    this.x = x;
    this.y = y;
    this.selected = false;
  }

  addMenuItem(action) {
    const menuItem = new BattleMenuItem(0, this.menuItems.length * 50, action, this.scene);
    this.menuItems.push(menuItem);
    this.add(menuItem);
    return menuItem;
  }

  addAvatar(texture) {
    const avatar = new BattleAvatar(this.scene, 220, this.heroesAvatar.length * 50, texture, 0, 0);
    this.heroesAvatar.push(avatar);
    this.add(avatar);
  }

  moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex -= 1;
      if (this.menuItemIndex < 0) this.menuItemIndex = this.menuItems.length - 1;
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  }

  moveSelectionDown() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex += 1;
      if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  }

  select(index) {
    if (!index) index = 0;
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    while (!this.menuItems[this.menuItemIndex].active) {
      this.menuItemIndex += 1;
      if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
      if (this.menuItemIndex === index) return;
    }
    this.menuItems[this.menuItemIndex].select();
    this.selected = true;
  }

  deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
    this.selected = false;
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
      unit.setMenuItem(this.addMenuItem(unit.type));
      if (unit instanceof Player) unit.setMenuItem(this.addAvatar(unit.avatar));
    }
    this.menuItemIndex = 0;
  }
}