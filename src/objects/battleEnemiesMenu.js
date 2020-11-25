import BattleMenu from './battleMenu';


export default class BattleEnemiesMenu extends BattleMenu {
  constructor(x, y, scene) {
    super(x, y, scene);
  }

  confirm() {
    // do something when the player selects an enemy
    this.scene.events.emit('Enemy', this.menuItemIndex);
  }
}