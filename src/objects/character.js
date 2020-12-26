
export default class Character {
  constructor(hp, maxHP, ap, xp, name, damage, superDamage, level) {
    this.hp = hp;
    this.ap = ap;
    this.xp = xp;
    this.name = name;
    this.damage = damage;
    this.superDamage = superDamage;
    this.maxHP = maxHP;
    this.maxAP = this.ap;


    if (xp > 130) {
      this.xp = 130;
    }

    if (this.xp >= 60 && this.xp < 90) {
      this.ap = 10;
    } else if (this.xp >= 90 && this.xp < 130) {
      this.ap = 20;
    } else if (this.xp >= 130) {
      this.ap = 30;
    }

    if (this.xp >= 30 && this.xp < 80 && level < 2) {
      this.damage = 30;
      this.hp = 120;
      this.maxHP = 120;
    } else if (this.xp >= 60 && this.xp < 90 && level < 3) {
      this.level = 3;
      this.damage = 35;
      this.hp = 130;
      this.maxHP = 130;
      this.superDamage = 55;
    } else if (this.xp >= 90 && this.xp < 130 && level < 4) {
      this.damage = 40;
      this.hp = 140;
      this.maxHP = 140;
      this.superDamage = 65;
    } else if (this.xp >= 130 && level < 5) {
      this.damage = 45;
      this.hp = 150;
      this.maxHP = 150;
      this.superDamage = 70;
    }
  }
}