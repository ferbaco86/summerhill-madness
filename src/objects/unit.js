import Phaser from 'phaser';

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage, abilityDamage = null, ap = null,
    apCost = null, abilityPic = null) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.type = type;
    this.hp = hp;
    this.maxHP = this.hp;
    this.damage = damage;
    this.abilityDamage = abilityDamage;
    this.living = true;
    this.menuItem = null;
    this.ap = ap;
    this.apCost = apCost;
    this.maxAP = this.ap;
    this.abilityPic = abilityPic;
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
      this.showAbilityPic(target);
      this.reduceAP(this.apCost);
      this.scene.events.emit('Message',
        `Woow! ${target.type} suffers ${this.abilityDamage} damage!!`);
    }
  }

  showAbilityPic(target) {
    const pic = this.scene.add.image(target.x + 20, target.y, this.abilityPic);
    pic.setScale(3);
    this.destroyPic = () => {
      pic.destroy();
    };
    this.scene.time.delayedCall(500, this.destroyPic, [], this);
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

  noMoreAp() {
    this.scene.events.emit('Message',
      `Oh no ${this.type} has 0 AP`);
  }

  reduceAP(amount) {
    this.ap -= amount;
  }

  healHP(amount) {
    let healed = false;
    if (this.hp === this.maxHP) {
      this.scene.events.emit('Message',
        `${this.type} has full health`);
    } else if (this.scene.sys.game.globals.candies === 0) {
      this.scene.events.emit('Message',
        "You don't have candies");
    } else {
      this.hp += amount;
      this.scene.events.emit('Message',
        `${this.type} healed ${amount} HP`);
      healed = true;
      this.scene.sys.game.globals.candies -= 1;
    }
    return healed;
  }
}