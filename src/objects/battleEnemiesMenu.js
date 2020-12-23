import BattleMenu from './battleMenu';


export default class BattleEnemiesMenu extends BattleMenu {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.soundSelect = this.scene.sound.add('selectFX', { volume: 0.2, loop: false });
  }

  confirm() {
    // do something when the player selects an enemy
    this.scene.events.emit('Enemy', this.menuItemIndex);
    this.soundSelect.play();
  }
}