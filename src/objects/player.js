import Unit from './unit';

export default class Player extends Unit {
  constructor(scene, x, y, texture, frame, type, hp,
    damage, avatar, idleAnim, hitAnim, damageAnim) {
    super(scene, x, y, texture, frame, type, hp, damage, avatar);
    this.setScale(3);
    scene.add.existing(this);
    this.type = type;
    this.avatar = avatar;
    this.idleAnim = idleAnim;
    this.hitAnim = hitAnim;
    this.damageAnim = damageAnim;
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
}