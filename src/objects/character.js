import Phaser from 'phaser';

export default class Character extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, portrait, hp, ap, xp, name, damage) {
    super(scene, x, y, texture, frame);
    this.portrait = portrait;
    this.hp = hp;
    this.ap = ap;
    this.xp = xp;
    this.name = name;
    this.level = 1;
    this.damage = damage;
    this.maxHP = this.hp;
    this.maxAP = this.ap;

    switch (this.xp) {
      case 50:
        this.level = 2;
        this.damage += 10;
        this.hp += 30;
        break;
      case 75:
        this.level = 3;
        this.damage += 10;
        this.hp += 30;
        this.ap += 10;
        break;
      case 100:
        this.level = 4;
        this.damage += 10;
        this.hp += 30;
        this.ap += 10;
        break;
      case 150:
        this.level = 5;
        this.damage += 10;
        this.hp += 30;
        this.ap += 10;
        break;
      default:
        break;
    }
  }
}