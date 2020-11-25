import BattleMenu from './battleMenu';


export default class BattleActionMenu extends BattleMenu {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.addMenuItem('Attack');
  }

  confirm() {
    // do something when the player selects an action
  }
}