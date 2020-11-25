import Phaser from 'phaser';

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame);
    this.type = type;
    this.hp = hp;
    this.maxHP = this.hp;
    this.damage = damage;
    this.living = true;
    this.menuItem = null;
  }

  // we will use this to notify the menu item when the unit is dead
  setMenuItem(item) {
    this.menuItem = item;
  }

  attack(target) {
    if (target.living) {
      target.takeDamage(this.damage);
      // this.scene.events.emit('Message',
      // `${this.type} attacks ${target.type} for ${this.damage} damage`);
    }
  }

  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }
  }
}