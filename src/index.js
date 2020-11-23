import Phaser from 'phaser';
import config from './config/config';
import IntroScene from './scenes/introScene';
import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import TitleScene from './scenes/titleScene';
import OptionsScene from './scenes/optionsScene';
import CreditsScene from './scenes/creditsScene';
import TownScene from './scenes/townScene';
import HouseScene from './scenes/houseScene';
import SchoolScene from './scenes/schoolScene';
import Model from './model';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', IntroScene);
    this.scene.add('Town', TownScene);
    this.scene.add('House', HouseScene);
    this.scene.add('School', SchoolScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();