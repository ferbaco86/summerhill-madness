import Unit from './unit';

export default class BattlePlayer extends Unit {
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
    this.hitSound = this.scene.sound.add('hitFX', { volume: 0.1, loop: false });
    this.hitSound2 = this.scene.sound.add('hitFX', { volume: 0.1, loop: false });
    this.eatCandySound = this.scene.sound.add('eatCandyFX', { volume: 0.3, loop: false });
  }

  playIdleAnimation() {
    this.anims.play(this.idleAnim);
  }

  playHitAnimation() {
    this.anims.play(this.hitAnim);
  }

  playTakeDamage() {
    this.anims.play(this.damageAnim);
    this.hitSound.play();
    this.playSecond = () => {
      this.hitSound2.play();
    };
    this.scene.time.delayedCall(300, this.playSecond, [], this.scene);
  }

  playEatAnimation() {
    this.anims.play(this.eatAnim);
    this.eatCandySound.play();
  }
}