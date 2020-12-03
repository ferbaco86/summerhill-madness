import Phaser from 'phaser';

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage, abilityDamage = null) {
    super(scene, x, y, texture, frame);
    this.type = type;
    this.hp = hp;
    this.maxHP = this.hp;
    this.damage = damage;
    this.abilityDamage = abilityDamage;
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
      this.scene.events.emit('Message',
        `Ouch! ${target.type} receives ${this.damage} damage!!`);
    }
  }

  ability(target) {
    if (target.living) {
      target.takeDamage(this.abilityDamage);
      this.scene.events.emit('Message',
        `Woow! ${target.type} suffers ${this.abilityDamage} damage!!`);
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