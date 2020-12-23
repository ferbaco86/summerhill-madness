import BattleMenu from './battleMenu';


export default class BattleHeroesMenu extends BattleMenu {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.scene = scene;
  }
}