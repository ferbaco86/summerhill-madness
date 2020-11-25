import Phaser from 'phaser';
import BattleHeroesMenu from '../objects/battleHeroesMenu';
import BattleActionMenu from '../objects/battleActionMenu';
import BattleEnemiesMenu from '../objects/battleEnemiesMenu';


export default class BattleUIScene extends Phaser.Scene {
  constructor() {
    super('BattleUI');
  }

  create() {
    this.battleScene = this.scene.get('Battle');
    const remapHeroes = () => {
      const { heroes } = this.battleScene;
      this.heroesMenu.remap(heroes);
    };
    const remapEnemies = () => {
      const { enemies } = this.battleScene;
      this.enemiesMenu.remap(enemies);
    };
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.add.image(0, 385, 'battleUIBG').setOrigin(0, 0);

    // basic container to hold all menus
    this.menus = this.add.container();

    this.heroesMenu = new BattleHeroesMenu(650, 410, this);
    this.actionsMenu = new BattleActionMenu(380, 410, this);
    this.enemiesMenu = new BattleEnemiesMenu(50, 410, this);

    // the currently selected menu
    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);

    remapHeroes();
    remapEnemies();
  }

  update() {

  }
}