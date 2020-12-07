import Unit from './unit';

export default class Enemy extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage, damageAnim, xp, coins) {
    super(scene, x, y, texture, frame, type, hp, damage);
    this.setScale(3);
    scene.add.existing(this);
    this.texture = texture;
    this.damageAnim = damageAnim;
    this.xp = xp;
    this.coins = coins;
  }

  attackAnim() {
    this.scene.tweens.add({
      targets: this, duration: 800, x: 150, ease: 'Bounce', yoyo: true,
    });
  }

  takeDamageAnim() {
    this.anims.play(this.damageAnim);
  }
}