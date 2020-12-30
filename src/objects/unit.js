import Phaser from 'phaser';
import message from '../utils/displayMessage';

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage, abilityDamage = null, ap = null,
    apCost = null, abilityPic = null, maxHP = null) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.type = type;
    this.hp = hp;
    this.maxHP = maxHP;
    this.damage = damage;
    this.abilityDamage = abilityDamage;
    this.living = true;
    this.menuItem = null;
    this.ap = ap;
    this.apCost = apCost;
    this.maxAP = this.ap;
    this.abilityPic = abilityPic;
    this.soundSmash = this.scene.sound.add('smashFX', { volume: 0.2, loop: false });
  }

  // we will use this to notify the menu item when the unit is dead
  setMenuItem(item) {
    this.menuItem = item;
  }

  attack(target) {
    if (target.living) {
      target.takeDamage(this.damage);
      const text = `Ouch! ${target.type} receives ${this.damage} damage!!`;
      const messageContainer = message.displayMessage(this.scene, 500, 50, text);
      this.destroyMessage = () => {
        messageContainer.destroy();
      };
      this.scene.time.delayedCall(1500, this.destroyMessage, [], this);
    }
  }

  ability(target) {
    if (target.living) {
      target.takeDamage(this.abilityDamage);
      this.showAbilityPic(target);
      this.reduceAP(this.apCost);
      this.soundSmash.play();

      const text = `Woow! ${target.type} suffers ${this.abilityDamage} damage!!`;
      const messageContainer = message.displayMessage(this.scene, 500, 50, text);
      this.destroyMessage = () => {
        messageContainer.destroy();
      };
      this.scene.time.delayedCall(1500, this.destroyMessage, [], this);
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
    const text = ` Oh no, ${this.type} has 0 AP`;
    const messageContainer = message.displayMessage(this.scene, 500, 50, text);
    this.destroyMessage = () => {
      messageContainer.destroy();
    };
    this.scene.time.delayedCall(1500, this.destroyMessage, [], this);
  }

  reduceAP(amount) {
    this.ap -= amount;
  }

  healHP(amount) {
    let healed = false;
    if (this.hp === this.maxHP) {
      this.messageContainer = message.displayMessage(this.scene, 500, 50, `${this.type} has full health`);
    } else if (this.scene.sys.game.globals.candies === 0) {
      this.messageContainer = message.displayMessage(this.scene, 500, 50, "You don't have candies");
    } else {
      this.hp += amount;
      this.messageContainer = message.displayMessage(this.scene, 500, 50, `${this.type} healed ${amount} HP`);
      healed = true;
      this.scene.sys.game.globals.candies -= 1;
    }
    this.destroyMessage = () => {
      this.messageContainer.destroy();
    };
    this.scene.time.delayedCall(1500, this.destroyMessage, [], this);
    return healed;
  }
}