import BattleMenu from './battleMenu';


export default class BattleActionMenu extends BattleMenu {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.addMenuItem('Attack');
    this.addMenuItem('Super Hit');
    this.addMenuItem('Eat Candy');
    this.addMenuItem('Run Away');
    this.soundSelect = this.scene.sound.add('selectFX', { volume: 0.2, loop: false });
  }

  confirm() {
    this.scene.events.emit('SelectedAction', this.menuItemIndex);
    this.soundSelect.play();
  }
}