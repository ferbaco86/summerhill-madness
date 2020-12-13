import Unit from './unit';

export default class BattleEnemy extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage, damageAnim, xp, coins) {
    super(scene, x, y, texture, frame, type, hp, damage);
    this.setScale(3);
    scene.add.existing(this);
    this.texture = texture;
    this.damageAnim = damageAnim;
    this.xp = xp;
    this.coins = coins;
    this.x = x;
  }

  attackAnim() {
    this.scene.tweens.add({
      targets: this, duration: 800, x: this.x + 50, ease: 'Bounce', yoyo: true,
    });
  }

  takeDamageAnim() {
    this.anims.play(this.damageAnim);
  }
}