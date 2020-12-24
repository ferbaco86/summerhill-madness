import Phaser from 'phaser';
import utils from '../utils/utilsFunctions';

export default class MainCharacter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame, portrait, hp, ap, xp, name, damage,
    superDamage, maxHP, level, runAway = null) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.portrait = portrait;
    this.hp = hp;
    this.ap = ap;
    this.xp = xp;
    this.name = name;
    this.level = level;
    this.damage = damage;
    this.superDamage = superDamage;
    this.maxHP = maxHP;
    this.maxAP = this.ap;
    scene.add.existing(this);
    this.levelUpWindow = utils.showLevelUpWindow(this.scene, 500, 300, 'winWindow', 'heartIcon', 'attackIcon', 'starIcon', 'mainFace', 'redHeadFace', 'dannyFace', this.xp);
    this.levelUpWindow.setVisible(false);
    this.levelUpSound = this.scene.sound.add('levelUpFX', { volume: 0.2, loop: false });

    this.showHideWindow = () => {
      if (!runAway && xp <= 130) {
        this.levelUpWindow.setVisible(true);
        this.levelUpSound.play();
        const hideWindow = () => {
          this.levelUpWindow.setVisible(false);
        };
        this.scene.time.delayedCall(2500, hideWindow, [], this.scene);
      }
    };

    if (xp > 130) {
      this.xp = 130;
    }

    if (this.xp >= 60 && this.xp < 90) {
      this.ap = 10;
    } else if (this.xp >= 90 && this.xp < 130) {
      this.ap = 30;
    } else if (this.xp >= 130) {
      this.ap = 40;
    }

    if (this.xp >= 30 && this.xp < 80 && this.level < 2) {
      this.level = 2;
      this.damage = 30;
      this.hp = 120;
      this.maxHP = 120;
      this.showHideWindow();
    } else if (this.xp >= 60 && this.xp < 90 && this.level < 3) {
      this.level = 3;
      this.damage = 35;
      this.hp = 130;
      this.maxHP = 130;
      this.superDamage = 55;
      this.showHideWindow();
    } else if (this.xp >= 90 && this.xp < 130 && this.level < 4) {
      this.level = 4;
      this.damage = 40;
      this.hp = 140;
      this.maxHP = 140;
      this.superDamage = 65;
      this.showHideWindow();
    } else if (this.xp >= 130 && this.level < 5) {
      this.level = 5;
      this.damage = 45;
      this.hp = 150;
      this.maxHP = 150;
      this.superDamage = 70;
      this.showHideWindow();
    }
  }
}