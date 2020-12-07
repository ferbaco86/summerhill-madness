import Unit from './unit';

export default class Player extends Unit {
  constructor(scene, x, y, texture, frame, type, hp,
    damage, abilityDamage, ap, apCost, abilityPic, idleAnim, hitAnim, damageAnim, eatAnim) {
    super(scene, x, y, texture, frame, type, hp, damage, abilityDamage,
      ap, apCost, abilityPic);
    this.setScale(3);
    scene.add.existing(this);
    this.type = type;
    this.idleAnim = idleAnim;
    this.hitAnim = hitAnim;
    this.damageAnim = damageAnim;
    this.eatAnim = eatAnim;
  }

  playIdleAnimation() {
    this.anims.play(this.idleAnim);
  }

  playHitAnimation() {
    this.anims.play(this.hitAnim);
  }

  playTakeDamage() {
    this.anims.play(this.damageAnim);
  }

  playEatAnimation() {
    this.anims.play(this.eatAnim);
  }
}