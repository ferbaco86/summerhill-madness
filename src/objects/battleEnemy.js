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
    this.hitSound = this.scene.sound.add('hitFX', { volume: 0.1, loop: false });
    this.hitSound2 = this.scene.sound.add('hitFX', { volume: 0.1, loop: false });
  }

  attackAnim() {
    this.scene.tweens.add({
      targets: this, duration: 800, x: this.x + 50, ease: 'Bounce', yoyo: true,
    });
  }

  takeDamageAnim() {
    this.anims.play(this.damageAnim);
    this.hitSound.play();
    this.playSecond = () => {
      this.hitSound2.play();
    };
    this.scene.time.delayedCall(300, this.playSecond, [], this.scene);
  }
}