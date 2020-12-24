
export default class Character {
  constructor(hp, maxHP, ap, xp, name, damage, superDamage) {
    this.hp = hp;
    this.ap = ap;
    this.xp = xp;
    this.name = name;
    this.damage = damage;
    this.superDamage = superDamage;
    this.maxHP = maxHP;
    this.maxAP = this.ap;

    if (xp > 150) {
      this.xp = 150;
    }

    switch (this.xp) {
      case 50:
        this.damage = 25;
        this.hp = 110;
        this.maxHP = 110;
        break;
      case 80:
        this.damage = 30;
        this.hp = 120;
        this.maxHP = 120;
        this.ap = 10;
        this.superDamage = 45;
        break;
      case 110:
        this.damage = 35;
        this.hp = 130;
        this.maxHP = 130;
        this.ap = 20;
        this.superDamage = 55;
        break;
      case 150:
        this.damage = 40;
        this.hp = 140;
        this.maxHP = 140;
        this.ap = 30;
        this.superDamage = 60;
        break;
      default:
        break;
    }
  }
}