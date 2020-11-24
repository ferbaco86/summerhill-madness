import Phaser from 'phaser';

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame);
    this.type = type;
    this.hp = hp;
    this.maxHP = this.hp;
    this.damage = damage;
  }

  attack(target) {
    target.takeDamage(this.damage);
  }

  takeDamage(damage) {
    this.hp -= damage;
  }
}