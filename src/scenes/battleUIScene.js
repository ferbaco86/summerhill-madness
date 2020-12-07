import Phaser from 'phaser';
import BattleHeroesMenu from '../objects/battleHeroesMenu';
import BattleActionMenu from '../objects/battleActionMenu';
import BattleEnemiesMenu from '../objects/battleEnemiesMenu';
import Message from '../objects/message';


export default class BattleUIScene extends Phaser.Scene {
  constructor() {
    super('BattleUI');
  }

  create() {
    this.battleScene = this.scene.get('Battle');
    this.charID = null;
    this.selectedActionIndex = null;

    this.remapHeroes = () => {
      const { heroes } = this.battleScene;
      this.heroesMenu.remap(heroes);
    };

    this.remapEnemies = () => {
      const { enemies } = this.battleScene;
      this.enemiesMenu.remap(enemies);
    };

    this.onKeyInput = (event) => {
      if (this.currentMenu && this.currentMenu.selected) {
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
      this.charID = id;
      this.heroesMenu.select(id);
      this.actionsMenu.select(0);
      this.currentMenu = this.actionsMenu;
    };

    this.onSelectedAction = (index) => {
      this.selectedActionIndex = index;
      this.char = this.battleScene.heroes[this.charID];

      switch (index) {
        case 0:
          this.currentMenu = this.enemiesMenu;
          this.enemiesMenu.select(0);
          break;
        case 1:
          if (this.char.ap <= 0) {
            this.char.noMoreAp();
          } else {
            this.currentMenu = this.enemiesMenu;
            this.enemiesMenu.select(0);
          }
          break;
        case 2:
          this.char.healHP(20);
          this.char.playEatAnimation();
          this.stopEating = () => {
            this.char.anims.stop();
            this.char.playIdleAnimation();
          };
          this.time.delayedCall(1000, this.stopEating, [], this);
          break;
        case 3:
          this.battleScene.exitBattle();
          break;

        default:
          break;
      }
    };

    this.onEnemy = (index) => {
      this.heroesMenu.deselect();
      this.actionsMenu.deselect();
      this.enemiesMenu.deselect();
      this.currentMenu = null;
      if (this.selectedActionIndex === 0) {
        this.battleScene.receivePlayerSelection('attack', index);
      } else if (this.selectedActionIndex === 1) {
        this.battleScene.receivePlayerSelection('ability', index);
      }
    };


    this.createMenu = () => {
      this.remapHeroes();
      this.remapEnemies();
      this.battleScene.nextTurn();
    };

    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.add.image(0, 385, 'battleUIBG').setOrigin(0, 0);

    // basic container to hold all menus
    this.menus = this.add.container();

    this.heroesMenu = new BattleHeroesMenu(650, 410, this);
    this.actionsMenu = new BattleActionMenu(375, 410, this);
    this.enemiesMenu = new BattleEnemiesMenu(50, 410, this);

    // the currently selected menu
    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);


    this.input.keyboard.on('keydown', this.onKeyInput, this);

    this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);
    this.events.on('SelectedAction', this.onSelectedAction, this);
    this.events.on('Enemy', this.onEnemy, this);

    this.sys.events.on('wake', this.createMenu, this);

    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);

    this.createMenu();
  }
}