import Phaser from 'phaser';

export default class Message extends Phaser.GameObjects.Container {
  constructor(scene, events) {
    super(scene, 500, 50);
    this.messageFrame = this.scene.add.image(500, 50, 'messageBattleUI');
    this.text = new Phaser.GameObjects.Text(scene, 0, 0, '', {
      color: '#ffffff', align: 'center', fontSize: 30, fontFamily: 'pixelFont', wordWrap: { width: 400, useAdvancedWrap: true },
    });
    this.add(this.text);
    this.text.setOrigin(0.5);
    events.on('Message', this.showMessage, this);
    this.visible = false;
  }

  showMessage(text) {
    this.text.setText(text);
    this.visible = true;
    if (this.hideEvent) this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent({
      delay: 2000,
      callback: this.hideMessage,
      callbackScope: this,
    });
  }

  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  }
}