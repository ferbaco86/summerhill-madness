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
    this.remapHeroes = () => {
      const { heroes } = this.battleScene;
      this.heroesMenu.remap(heroes);
    };

    this.remapEnemies = () => {
      const { enemies } = this.battleScene;
      this.enemiesMenu.remap(enemies);
    };

    this.onKeyInput = (event) => {
      if (this.currentMenu) {
        if (event.code === 'ArrowUp') {
          this.currentMenu.moveSelectionUp();
        } else if (event.code === 'ArrowDown') {
          this.currentMenu.moveSelectionDown();
        } else if (event.code === 'Space' || event.code === 'ArrowLeft') {
          this.currentMenu.confirm();
        }
      }
    };

    this.onPlayerSelect = (id) => {
      this.heroesMenu.select(id);
      this.actionsMenu.select(0);
      this.currentMenu = this.actionsMenu;
    };

    this.onEnemy = (index) => {
      this.heroesMenu.deselect();
      this.actionsMenu.deselect();
      this.enemiesMenu.deselect();
      this.currentMenu = null;
      this.battleScene.receivePlayerSelection('attack', index);
    };

    this.onSelectEnemies = () => {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(0);
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

    this.remapHeroes();
    this.remapEnemies();

    this.input.keyboard.on('keydown', this.onKeyInput, this);

    this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);
    this.events.on('SelectEnemies', this.onSelectEnemies, this);
    this.events.on('Enemy', this.onEnemy, this);

    this.battleScene.nextTurn();
  }
}