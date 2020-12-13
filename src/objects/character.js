
export default class Character {
  constructor(hp, ap, xp, name, damage, superDamage) {
    this.hp = hp;
    this.ap = ap;
    this.xp = xp;
    this.name = name;
    this.level = 1;
    this.damage = damage;
    this.superDamage = superDamage;
    this.maxHP = this.hp;
    this.maxAP = this.ap;

    if (xp > 150) {
      this.xp = 150;
    }

    switch (this.xp) {
      case 50:
        this.level = 2;
        this.damage = 25;
        this.hp = 110;
        break;
      case 75:
        this.level = 3;
        this.damage = 30;
        this.hp = 120;
        this.ap = 10;
        this.superDamage = 45;
        break;
      case 100:
        this.level = 4;
        this.damage = 35;
        this.hp = 130;
        this.ap = 20;
        this.superDamage = 55;
        break;
      case 150:
        this.level = 5;
        this.damage = 40;
        this.hp = 140;
        this.ap = 30;
        this.superDamage = 70;
        break;
      default:
        break;
    }
  }
}