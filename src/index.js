import Phaser from 'phaser';
import config from './config/config';
import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import TitleScene from './scenes/titleScene';
import OptionsScene from './scenes/optionsScene';
import CreditsScene from './scenes/creditsScene';
import WelcomeScene from './scenes/welcomeScene';
import IntroScene from './scenes/introScene';
import TownScene from './scenes/townScene';
import HouseScene from './scenes/houseScene';
import SchoolScene from './scenes/schoolScene';
import BattleScene from './scenes/battleScene';
import GameOverScene from './scenes/gameOverScene';
import BattleUIScene from './scenes/battleUIScene';
import VictoryScene from './scenes/victoryScene';
import HighScoresScene from './scenes/highScoresScene';
import Model from './model';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = {
      model,
      bgMusic: null,
      enemiesDefeated: [],
      playerName: '',
      withDanny: false,
      dannyFirst: false,
    };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Welcome', WelcomeScene);
    this.scene.add('Game', IntroScene);
    this.scene.add('Town', TownScene);
    this.scene.add('House', HouseScene);
    this.scene.add('School', SchoolScene);
    this.scene.add('Battle', BattleScene);
    this.scene.add('BattleUI', BattleUIScene);
    this.scene.add('Victory', VictoryScene);
    this.scene.add('HighScores', HighScoresScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();