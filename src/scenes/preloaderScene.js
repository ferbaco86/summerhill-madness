import Phaser from 'phaser';
import utils from '../utils/utilsFunctions';
import chestSprite from '../assets/backgrounds/chestSpritesheet.png';
import bgMenu from '../assets/backgrounds/Menu.png';
import winWindow from '../assets/backgrounds/win.png';
import hudBG from '../assets/backgrounds/hudBG.png';
import introBG from '../assets/backgrounds/introScene.png';
import title from '../assets/ui/smTitle.png';
import soundTitle from '../assets/ui/soundTitle.png';
import top5Title from '../assets/ui/top5.png';
import gameOverTitle from '../assets/ui/gameOver.png';
import victoryTitle from '../assets/ui/victory.png';
import congratsTitle from '../assets/ui/congrats.png';
import levelUpTitle from '../assets/ui/levelUp.png';
import purpleSquare from '../assets/ui/squarePurple.png';
import redHeadFace from '../assets/redHeadCharacter/redHeadFaceFrame.png';
import dannyFace from '../assets/dannyCharacter/dannyFaceFrame.png';
import mainFace from '../assets/mainCharacter/mainCharFaceFrame.png';
import demonFace from '../assets/monsters/demonFaceFrame.png';
import defeated from '../assets/mainCharacter/defeated.png';
import moneyIcon from '../assets/ui/money.png';
import candyIcon from '../assets/ui/candy.png';
import attackIcon from '../assets/ui/attackIcon.png';
import button1 from '../assets/ui/buttonDefault.png';
import arrowRight from '../assets/ui/arrow_point_right.png';
import button2 from '../assets/ui/buttonHover.png';
import introSleeping from '../assets/mainCharacter/sleepingSpriteAnim.png';
import batPickUp from '../assets/mainCharacter/weaponPickupBase-sheet.png';
import homeRun from '../assets/mainCharacter/HomeRun.png';
import mainEat from '../assets/mainCharacter/mainCharEatCandy.png';
import redHeadEat from '../assets/redHeadCharacter/redHeadEatCandy.png';
import dannyEat from '../assets/dannyCharacter/dannyEatCandyAnim.png';
import smash from '../assets/redHeadCharacter/Smash.png';
import bigBookHit from '../assets/dannyCharacter/bigBookHit.png';
import redHeadWalkUp from '../assets/redHeadCharacter/redHeadWalkUp.png';
import redHeadWalkRight from '../assets/redHeadCharacter/redHeadWalkRight.png';
import redHeadWalkDown from '../assets/redHeadCharacter/redHeadWalkDown.png';
import redHeadWalkLeft from '../assets/redHeadCharacter/redHeadWalkLeft.png';
import mainWalkDown from '../assets/mainCharacter/mainWalkDown.png';
import mainWalkLeft from '../assets/mainCharacter/mainWalkLeft.png';
import mainWalkRight from '../assets/mainCharacter/mainWalkRight.png';
import mainWalkUp from '../assets/mainCharacter/mainWalkUp.png';
import mainCeleb from '../assets/mainCharacter/celebSpriteSheet.png';
import batHit from '../assets/mainCharacter/BatHit.png';
import bookHit from '../assets/dannyCharacter/dannyBookHitAnim.png';
import tennisHit from '../assets/redHeadCharacter/tennisHit.png';
import blueSlimeDown from '../assets/monsters/blueSlimeIdleWalkDown.png';
import blueSlimeBattler from '../assets/monsters/blueSlimeBattler.png';
import blueSlimeBattlerDamage from '../assets/monsters/blueSlimeBattlerDamage.png';
import redSlimeDown from '../assets/monsters/redSlimeIdleWalkDownSprite.png';
import redSlimeBattler from '../assets/monsters/redSlimeBattler.png';
import redSlimeBattlerDamage from '../assets/monsters/redSlimeTakeDamageAnim.png';
import snakeBattlerDamage from '../assets/monsters/snakeTakeDamageAnim.png';
import plantBattlerDamage from '../assets/monsters/plantTakeDamageAnim.png';
import beeBattlerDamage from '../assets/monsters/beeTakeDamageAnim.png';
import flyBattlerDamage from '../assets/monsters/flyTakeDamageAnim.png';
import demonBattlerDamage from '../assets/monsters/demonTakeDamageAnim.png';
import snakeBattler from '../assets/monsters/snakeBattler.png';
import plantBattler from '../assets/monsters/plantBattler.png';
import beeBattler from '../assets/monsters/beeBattler.png';
import flyBattler from '../assets/monsters/flyBattler.png';
import demonBattler from '../assets/monsters/demonBattler.png';
import demonStand from '../assets/monsters/demon-sheet.png';
import snakeDown from '../assets/monsters/snakeIdleWalkDownSprite.png';
import beeDown from '../assets/monsters/beeIdleWalkDown.png';
import flyDown from '../assets/monsters/flyIdleWalkDown.png';
import plantDown from '../assets/monsters/flowerIdleWalkDown.png';
import mainCharBattleStand from '../assets/mainCharacter/mainCharBattle_stand.png';
import mainCharTakeDamage from '../assets/mainCharacter/mainTakeDamage.png';
import redHeadBattleStand from '../assets/redHeadCharacter/redHeadBattle_stand.png';
import redHeadTakeDamage from '../assets/redHeadCharacter/redHeadTakeDamage.png';
import dannyBattleStand from '../assets/dannyCharacter/dannyStandAnim.png';
import dannyTakeDamage from '../assets/dannyCharacter/dannyTakeDamageAnim.png';
import dannyCrawl from '../assets/dannyCharacter/dannyCrawlAnim.png';
import tileSet from '../assets/backgrounds/tileset-extruded.png';
import wallsTileSet from '../assets/backgrounds/tile-walls-extruded.png';
import emptySprite from '../assets/backgrounds/emptySprite.png';
import battleUIBG from '../assets/ui/battleUI.png';
import heart from '../assets/ui/heart.png';
import star from '../assets/ui/star.png';
import battleMessageUI from '../assets/ui/messageFrame.png';
import maximize from '../assets/ui/maximize.png';
import townBattleBG from '../assets/backgrounds/townBattle.png';
import houseBattleBG from '../assets/backgrounds/houseBattle.png';
import schoolBattleBG from '../assets/backgrounds/schoolBattle.png';
import mapData from '../assets/data/Town.json';
import houseData from '../assets/data/dannyHouse.json';
import schoolData from '../assets/data/School.json';
import soundOff from '../assets/ui/soundOff.png';
import soundOn from '../assets/ui/soundOn.png';
import titleMusic from '../assets/sounds/like-totally-rad.ogg';
import monstersAmb from '../assets/sounds/strangeMonsters.ogg';
import townMusic from '../assets/sounds/town.ogg';
import doorOpenFX from '../assets/sounds/doorOpen.wav';
import textFX from '../assets/sounds/text.wav';
import stepsFX from '../assets/sounds/steps.wav';
import getItemFX from '../assets/sounds/itemget2.wav';
import wowFX from '../assets/sounds/wow.wav';
import acceptFX from '../assets/sounds/Accept3.ogg';
import battleMusic from '../assets/sounds/battle.ogg';
import houseMusic from '../assets/sounds/houseBG.wav';
import schoolMusic from '../assets/sounds/schoolBG.wav';
import meetEnemyFX from '../assets/sounds/meetEnemy.ogg';
import tweetFX from '../assets/sounds/Tweet.ogg';
import selectFX from '../assets/sounds/select.ogg';
import hitFX from '../assets/sounds/hit.ogg';
import eatCandyFX from '../assets/sounds/Powerup.ogg';
import victoryFX from '../assets/sounds/Victory.ogg';
import gameOverFX from '../assets/sounds/gameOver01.ogg';
import gameCompletedFX from '../assets/sounds/goodFinal.ogg';
import levelUpFX from '../assets/sounds/levelup.wav';
import smashFX from '../assets/sounds/smash.wav';
import '../style.css';


export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(320, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '38px pixelFont',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '28px pixelFont',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '28px pixelFont',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(330, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(25000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('button1', button1);
    this.load.image('button2', button2);
    this.load.image('nextPage', arrowRight);
    this.load.image('purpleSquare', purpleSquare);
    this.load.image('winWindow', winWindow);
    this.load.image('candyIcon', candyIcon);
    this.load.image('attackIcon', attackIcon);
    this.load.image('moneyIcon', moneyIcon);
    this.load.image('defeated', defeated);
    this.load.image('redHeadFace', redHeadFace);
    this.load.image('mainFace', mainFace);
    this.load.image('dannyFace', dannyFace);
    this.load.image('demonFace', demonFace);
    this.load.image('emptySprite', emptySprite);
    this.load.image('soundOn', soundOn);
    this.load.image('hudBG', hudBG);
    this.load.image('soundOff', soundOff);
    this.load.audio('bgMusic', [titleMusic]);
    this.load.audio('monstersAmb', [monstersAmb]);
    this.load.audio('townMusic', [townMusic]);
    this.load.audio('battleMusic', [battleMusic]);
    this.load.audio('houseMusic', [houseMusic]);
    this.load.audio('schoolMusic', [schoolMusic]);
    this.load.audio('doorOpen', [doorOpenFX]);
    this.load.audio('stepsFX', [stepsFX]);
    this.load.audio('tweetFX', [tweetFX]);
    this.load.audio('getItemFX', [getItemFX]);
    this.load.audio('wowFX', [wowFX]);
    this.load.audio('textFX', [textFX]);
    this.load.audio('acceptFX', [acceptFX]);
    this.load.audio('selectFX', [selectFX]);
    this.load.audio('meetEnemyFX', [meetEnemyFX]);
    this.load.audio('hitFX', [hitFX]);
    this.load.audio('eatCandyFX', [eatCandyFX]);
    this.load.audio('victoryFX', [victoryFX]);
    this.load.audio('gameOverFX', [gameOverFX]);
    this.load.audio('gameCompletedFX', [gameCompletedFX]);
    this.load.audio('levelUpFX', [levelUpFX]);
    this.load.audio('smashFX', [smashFX]);
    this.load.image('bgMenu', bgMenu);
    this.load.image('heartIcon', heart);
    this.load.image('starIcon', star);
    this.load.image('homeRun', homeRun);
    this.load.image('smash', smash);
    this.load.image('bigBookHit', bigBookHit);
    this.load.image('blueSlimeBattler', blueSlimeBattler);
    this.load.image('redSlimeBattler', redSlimeBattler);
    this.load.image('snakeBattler', snakeBattler);
    this.load.image('beeBattler', beeBattler);
    this.load.image('flyBattler', flyBattler);
    this.load.image('plantBattler', plantBattler);
    this.load.image('demonBattler', demonBattler);
    this.load.image('gameTitle', title);
    this.load.image('soundTitle', soundTitle);
    this.load.image('top5Title', top5Title);
    this.load.image('gameOverTitle', gameOverTitle);
    this.load.image('congratsTitle', congratsTitle);
    this.load.image('victoryTitle', victoryTitle);
    this.load.image('levelUpTitle', levelUpTitle);
    this.load.image('introBG', introBG);
    this.load.image('wallTiles', wallsTileSet);
    this.load.image('battleUIBG', battleUIBG);
    this.load.image('messageBattleUI', battleMessageUI);
    this.load.image('tiles', tileSet);
    this.load.image('townBattleBG', townBattleBG);
    this.load.image('houseBattleBG', houseBattleBG);
    this.load.image('schoolBattleBG', schoolBattleBG);
    this.load.tilemapTiledJSON('townMap', mapData);
    this.load.tilemapTiledJSON('houseMap', houseData);
    this.load.tilemapTiledJSON('schoolMap', schoolData);
    this.load.spritesheet('introSleeping', introSleeping, {
      frameWidth: 152,
      frameHeight: 232,
    });
    this.load.spritesheet('redHeadUp', redHeadWalkUp, {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet('redHeadRight', redHeadWalkRight, {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet('redHeadDown', redHeadWalkDown, {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet('redHeadLeft', redHeadWalkLeft, {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet('mainRight', mainWalkRight, {
      frameWidth: 16,
      frameHeight: 26,
    });
    this.load.spritesheet('mainLeft', mainWalkLeft, {
      frameWidth: 16,
      frameHeight: 26,
    });
    this.load.spritesheet('mainDown', mainWalkDown, {
      frameWidth: 16,
      frameHeight: 26,
    });
    this.load.spritesheet('mainUp', mainWalkUp, {
      frameWidth: 16,
      frameHeight: 26,
    });
    this.load.spritesheet('mainCeleb', mainCeleb, {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('mainBatPick', batPickUp, {
      frameWidth: 30,
      frameHeight: 48,
    });
    this.load.spritesheet('blueSlimeDown', blueSlimeDown, {
      frameWidth: 20,
      frameHeight: 20,
    });
    this.load.spritesheet('redSlimeDown', redSlimeDown, {
      frameWidth: 20,
      frameHeight: 20,
    });
    this.load.spritesheet('snakeDown', snakeDown, {
      frameWidth: 17,
      frameHeight: 20,
    });
    this.load.spritesheet('beeDown', beeDown, {
      frameWidth: 30,
      frameHeight: 25,
    });
    this.load.spritesheet('flyDown', flyDown, {
      frameWidth: 32,
      frameHeight: 31,
    });
    this.load.spritesheet('plantDown', plantDown, {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('demonStand', demonStand, {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('mainCharBattleStand', mainCharBattleStand, {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('redHeadBattleStand', redHeadBattleStand, {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('dannyBattleStand', dannyBattleStand, {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('maximize', maximize, {
      frameWidth: 18,
      frameHeight: 18,
    });
    this.load.spritesheet('batHit', batHit, {
      frameWidth: 36,
      frameHeight: 30,
    });
    this.load.spritesheet('tennisHit', tennisHit, {
      frameWidth: 36,
      frameHeight: 30,
    });
    this.load.spritesheet('bookHit', bookHit, {
      frameWidth: 36,
      frameHeight: 30,
    });
    this.load.spritesheet('blueSlimeDamage', blueSlimeBattlerDamage, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('redSlimeDamage', redSlimeBattlerDamage, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('snakeDamage', snakeBattlerDamage, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('beeDamage', beeBattlerDamage, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('flyDamage', flyBattlerDamage, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('plantDamage', plantBattlerDamage, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('demonDamage', demonBattlerDamage, {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('mainTakeDamage', mainCharTakeDamage, {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('redHeadTakeDamage', redHeadTakeDamage, {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('dannyTakeDamage', dannyTakeDamage, {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('mainEat', mainEat, {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('redHeadEat', redHeadEat, {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('dannyEat', dannyEat, {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('dannyCrawl', dannyCrawl, {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.spritesheet('chestOpen', chestSprite, {
      frameWidth: 26,
      frameHeight: 17,
    });
  }

  create() {
    this.animKeys = ['introSleepingAnim', 'redHeadWalkUp', 'redHeadWalkDown', 'redHeadWalkLeft', 'redHeadWalkRight',
      'mainCharWalkDown', 'mainCharWalkLeft', 'mainCharWalkRight', 'mainCharWalkUp', 'batPickUp', 'blueSlimeWalkDown',
      'redSlimeWalkDown', 'snakeWalkDown', 'beeWalkDown', 'flyWalkDown', 'plantWalkDown', 'demonStandAnim'];
    this.battleAnimKeys = ['mainCharIdle', 'redHeadIdle', 'dannyIdle', 'dannyFloorCrawl', 'mainCharCeleb'];
    this.hitAnimKeys = ['batHitAnim', 'tennisHitAnim', 'bookHitAnim', 'blueSlimeDamageAnim', 'redSlimeDamageAnim', 'snakeDamageAnim', 'beeDamageAnim', 'flyDamageAnim', 'plantDamageAnim',
      'demonDamageAnim', 'mainTakeDamageAnim', 'redHeadTakeDamageAnim', 'dannyTakeDamageAnim', 'mainEatAnim', 'redHeadEatAnim', 'dannyEatAnim', 'chestOpenAnim'];
    this.hitSpriteSheets = ['batHit', 'tennisHit', 'bookHit', 'blueSlimeDamage', 'redSlimeDamage', 'snakeDamage', 'beeDamage', 'flyDamage', 'plantDamage',
      'demonDamage', 'mainTakeDamage', 'redHeadTakeDamage', 'dannyTakeDamage', 'mainEat', 'redHeadEat', 'dannyEat', 'chestOpen'];
    this.battleSpriteSheets = ['mainCharBattleStand', 'redHeadBattleStand', 'dannyBattleStand', 'dannyCrawl', 'mainCeleb'];
    this.spriteSheets = ['introSleeping', 'redHeadUp', 'redHeadDown', 'redHeadLeft', 'redHeadRight',
      'mainDown', 'mainLeft', 'mainRight', 'mainUp', 'mainBatPick', 'blueSlimeDown', 'redSlimeDown', 'snakeDown', 'beeDown', 'flyDown', 'plantDown', 'demonStand'];
    utils.createAnims(this, this.animKeys, this.spriteSheets, 10, -1);
    utils.createAnims(this, this.battleAnimKeys, this.battleSpriteSheets, 4, -1);
    utils.createAnims(this, this.hitAnimKeys, this.hitSpriteSheets, 10, 1);
  }

  ready() {
    this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}