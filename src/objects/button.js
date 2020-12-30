import Phaser from 'phaser';
import utils from '../utils/utilsFunctions';


export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, text, targetScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    const sound = this.scene.sound.add('acceptFX', { volume: 0.1, loop: false });
    this.button = this.scene.add.sprite(0, 0, key1).setInteractive().setOrigin(0);
    this.text = this.scene.add.text(0, 0, text, { font: '28px pixelFont', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      utils.fadeOutScene(scene, targetScene, 1000);
      sound.play();
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(key2);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });

    this.scene.add.existing(this);
  }
}