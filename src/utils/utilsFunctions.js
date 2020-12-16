import Phaser from 'phaser';
import HudDisplay from '../objects/hudDisplay';
import BattleEnemy from '../objects/battleEnemy';


const utils = (() => {
  const { GetValue } = Phaser.Utils.Objects;

  const getBBcodeText = (scene, wrapWidth, fixedWidth, fixedHeight, fontSize) => scene.rexUI.add.BBCodeText(0, 0, '', {
    fixedWidth,
    fixedHeight,
    fontSize,
    fontFamily: 'pixelFont',
    wrap: {
      mode: 'word',
      width: wrapWidth,
    },
    maxLines: 2,
  });

  const createTextBox = (scene, x, y, config, window, icon, speechFX,
    fontSize, eventEmit = null, active = null) => {
    const wrapWidth = GetValue(config, 'wrapWidth', 0);
    const fixedWidth = GetValue(config, 'fixedWidth', 0);
    const fixedHeight = GetValue(config, 'fixedHeight', 0);
    const textBox = scene.rexUI.add.textBox({
      x,
      y,

      background: scene.add.image(0, 0, window),
      icon: scene.add.image(0, 0, icon).setScale(2),
      iconMask: false,
      text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight, fontSize),

      action: scene.add.image(0, 0, 'nextPage').setScale(2).setVisible(false),

      space: {
        left: 30,
        right: 30,
        top: 30,
        bottom: 30,
        icon: 20,
        text: 20,
      },
    })
      .setOrigin(0)
      .layout();
    if (active === true) {
      const onKeyInput = (event) => {
        if (event.code === 'Space') {
          const icon = textBox.getElement('action').setVisible(false);
          textBox.resetChildVisibleState(icon);
          if (textBox.isLastPage) {
            textBox.destroy();
            if (eventEmit != null) {
              scene.emitter.emit(eventEmit);
            }
          }
          if (textBox.isTyping) {
            textBox.stop(true);
          } else {
            textBox.typeNextPage();
          }
        }
      };
      scene.input.keyboard.on('keydown', onKeyInput, textBox);
      textBox.on('pageend', () => {
        const icon = textBox.getElement('action').setVisible(true);
        textBox.resetChildVisibleState(icon);
        icon.y -= 30;
        scene.tweens.add({
          targets: icon,
          y: '+=30',
          ease: 'Bounce',
          duration: 500,
          repeat: 0,
          yoyo: false,
        });
      }, textBox);
      textBox.on('type', () => {
        speechFX.play();
      });
    } else {
      textBox.on('pageend', () => {
        scene.time.delayedCall(1000, textBox.typeNextPage, [], textBox);
        if (textBox.isLastPage) {
          const finishMessage = () => {
            textBox.destroy();
            if (eventEmit != null) {
              scene.emitter.emit(eventEmit);
            }
          };
          scene.time.delayedCall(1000, finishMessage, [], textBox);
        }
      }, textBox);
      textBox.on('type', () => {
        speechFX.play();
      });
    }
    return textBox;
  };

  const fadeOutScene = (scene, newScene, delay) => {
    scene.cameras.main.fadeOut(delay, 0, 0, 0);
    scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      scene.scene.start(newScene);
    });
  };

  const createAnims = (scene, keys, spritesNames, rate, timeRepeat) => {
    for (let index = 0; index < keys.length; index += 1) {
      scene.anims.create({
        key: keys[index],
        frames: scene.anims.generateFrameNumbers(spritesNames[index]),
        frameRate: rate,
        repeat: timeRepeat,
      });
    }
  };

  const setFullScreen = (scene, button) => {
    button.on('pointerup', () => {
      if (scene.scale.isFullscreen) {
        button.setFrame(0);

        scene.scale.stopFullscreen();
      } else {
        button.setFrame(1);

        scene.scale.startFullscreen();
      }
    }, scene);
  };

  const displayHudElements = (scene, money, candy, charStats) => {
    scene.hudDisplay = new HudDisplay(scene, 320, 207, 'mainFace', 'heartIcon', charStats.mainHP, 'starIcon', charStats.mainAP,
      charStats.mainLevel);
    scene.hudDisplay = new HudDisplay(scene, 320, 237, 'redHeadFace', 'heartIcon', charStats.redHeadHP, 'starIcon',
      charStats.redHeadAP, charStats.redHeadLevel);
    const alphaBG = scene.add.rectangle(345, 390, 120, 20, '0x00000');
    alphaBG.setScrollFactor(0).setDepth(30).setAlpha(0.5);
    const moneyIcon = scene.add.image(330, 390, 'moneyIcon');
    const moneyAmount = scene.add.text(340, 383, money, { font: '12px pixelFont' });
    const candyIcon = scene.add.image(372, 390, 'candyIcon');
    const candyAmount = scene.add.text(382, 383, candy, { font: '12px pixelFont' });
    const hudGroup = scene.add.group();
    hudGroup.add(moneyIcon);
    hudGroup.add(moneyAmount);
    hudGroup.add(candyIcon);
    hudGroup.add(candyAmount);
    const groupChildren = hudGroup.getChildren();
    groupChildren.forEach(child => {
      child.setDepth(30).setScrollFactor(0);
    });
  };

  const createMonster = (scene, spawnX, spawnY, texture, frame, name, animToPlay) => {
    const enemy = scene.physics.add.sprite(spawnX, spawnY, texture, frame);
    enemy.setName(name);
    enemy.anims.play(animToPlay);
    return enemy;
  };

  const selectEnemies = (scene, enemyName) => {
    const enemiesInfo = {};
    const enemies = [];
    let totalXP = 0;
    let totalMoney = 0;
    let enemy1 = null;
    let enemy2 = null;
    let enemy3 = null;

    switch (enemyName) {
      case 'blueSlime1':
        enemy1 = new BattleEnemy(scene, 100, 200, 'blueSlimeBattler', 0, 'Blue Slime', 40, 10, 'blueSlimeDamageAnim', 50, 100);
        enemy2 = new BattleEnemy(scene, 100, 300, 'blueSlimeBattler', 0, 'Blue Slime 2', 40, 10, 'blueSlimeDamageAnim', 50, 100);
        enemy3 = new BattleEnemy(scene, 200, 250, 'blueSlimeBattler', 0, 'Blue Slime 3', 40, 10, 'blueSlimeDamageAnim', 50, 100);
        enemies.push(enemy1);
        enemies.push(enemy2);
        enemies.push(enemy3);
        totalXP = 50;
        totalMoney = 10;
        enemiesInfo.enemies = enemies;
        enemiesInfo.totalXP = totalXP;
        enemiesInfo.totalMoney = totalMoney;
        break;
      case 'redSlime1':
        enemy1 = new BattleEnemy(scene, 100, 200, 'redSlimeBattler', 0, 'Red Slime', 40, 10, 'blueSlimeDamageAnim', 50, 100);
        enemy2 = new BattleEnemy(scene, 100, 300, 'redSlimeBattler', 0, 'Red Slime 2', 40, 10, 'blueSlimeDamageAnim', 50, 100);
        enemy3 = new BattleEnemy(scene, 200, 250, 'redSlimeBattler', 0, 'Red Slime 3', 40, 10, 'blueSlimeDamageAnim', 50, 100);
        enemies.push(enemy1);
        enemies.push(enemy2);
        enemies.push(enemy3);
        totalXP = 75;
        totalMoney = 12;
        enemiesInfo.enemies = enemies;
        enemiesInfo.totalXP = totalXP;
        enemiesInfo.totalMoney = totalMoney;
        break;
      case 'snake':
        enemy1 = new BattleEnemy(scene, 100, 200, 'snakeBattler', 0, 'Snake', 40, 10, 'snakeDamageAnim', 50, 100);
        enemy2 = new BattleEnemy(scene, 100, 300, 'snakeBattler', 0, 'Snake 2', 40, 10, 'snakeDamageAnim', 50, 100);
        enemies.push(enemy1);
        enemies.push(enemy2);
        totalXP = 75;
        totalMoney = 12;
        enemiesInfo.enemies = enemies;
        enemiesInfo.totalXP = totalXP;
        enemiesInfo.totalMoney = totalMoney;
        break;
      case 'bee':
        enemy1 = new BattleEnemy(scene, 100, 200, 'beeBattler', 0, 'Bee', 40, 10, 'beeDamageAnim', 50, 100);
        enemy2 = new BattleEnemy(scene, 100, 300, 'beeBattler', 0, 'Bee 2', 40, 10, 'beeDamageAnim', 50, 100);
        enemy3 = new BattleEnemy(scene, 200, 250, 'beeBattler', 0, 'Bee 3', 40, 10, 'beeDamageAnim', 50, 100);
        enemies.push(enemy1);
        enemies.push(enemy2);
        enemies.push(enemy3);
        totalXP = 75;
        totalMoney = 12;
        enemiesInfo.enemies = enemies;
        enemiesInfo.totalXP = totalXP;
        enemiesInfo.totalMoney = totalMoney;
        break;
      case 'plant':
        enemy1 = new BattleEnemy(scene, 100, 200, 'plantBattler', 0, 'Plant', 40, 10, 'plantDamageAnim', 50, 100);
        enemy2 = new BattleEnemy(scene, 100, 300, 'plantBattler', 0, 'Plant 2', 40, 10, 'plantDamageAnim', 50, 100);
        enemies.push(enemy1);
        enemies.push(enemy2);
        totalXP = 75;
        totalMoney = 12;
        enemiesInfo.enemies = enemies;
        enemiesInfo.totalXP = totalXP;
        enemiesInfo.totalMoney = totalMoney;
        break;
      case 'fly':
        enemy1 = new BattleEnemy(scene, 100, 200, 'flyBattler', 0, 'Fly', 40, 10, 'flyDamageAnim', 50, 100);
        enemy2 = new BattleEnemy(scene, 100, 300, 'flyBattler', 0, 'Fly 2', 40, 10, 'flyDamageAnim', 50, 100);
        enemies.push(enemy1);
        enemies.push(enemy2);
        totalXP = 75;
        totalMoney = 12;
        enemiesInfo.enemies = enemies;
        enemiesInfo.totalXP = totalXP;
        enemiesInfo.totalMoney = totalMoney;
        break;
      default:
        break;
    }
    return enemiesInfo;
  };

  const showLevelUpWindow = (scene, x, y, bgPic, heartIcon, swordIcon,
    starIcon, mainPortraitTexture, redHeadPortraitTexture, xp = null) => {
    const BG = scene.add.image(x, y, bgPic).setDepth(30).setScale(0.3);
    const levelUpText = scene.add.text(x - 34, y - 52, 'Level Up!', { font: '16px pixelFont', color: '#87EB3F' });
    const hpText = scene.add.text(x - 50, y + 5, '+ 10', { font: '8px pixelFont', color: '#ffff' });
    hpText.setDepth(40);
    const attackText = scene.add.text(x - 50, y + 20, '+ 5', { font: '8px pixelFont', color: '#ffff' });
    attackText.setDepth(40);
    const hpText2 = scene.add.text(x + 50, y + 5, '+ 10', { font: '8px pixelFont', color: '#ffff' });
    hpText2.setDepth(40);
    const attackText2 = scene.add.text(x + 50, y + 20, '+ 5', { font: '8px pixelFont', color: '#ffff' });
    attackText2.setDepth(40);
    levelUpText.setDepth(40);
    levelUpText.setOrigin(0);
    const mainCharPortrait = scene.add.image(x - 50, y - 15, mainPortraitTexture)
      .setDepth(40).setScale(0.7);
    const rhPortrait = scene.add.image(x + 50, y - 15, redHeadPortraitTexture)
      .setDepth(40).setScale(0.7);
    const hpIcon1 = scene.add.image(x - 60, y + 10, heartIcon)
      .setDepth(40);
    const hpIcon2 = scene.add.image(x + 40, y + 10, heartIcon)
      .setDepth(40);
    const damageIcon1 = scene.add.image(x - 60, y + 25, swordIcon)
      .setDepth(40);
    const damageIcon2 = scene.add.image(x + 40, y + 25, swordIcon)
      .setDepth(40);
    const windowGroup = scene.add.group();
    if (xp >= 75) {
      const actionText = scene.add.text(x - 50, y + 35, '+ 10', { font: '8px pixelFont', color: '#ffff' });
      actionText.setDepth(40);
      const actionsIcon1 = scene.add.image(x - 60, y + 40, starIcon)
        .setDepth(40);
      windowGroup.add(actionText);
      windowGroup.add(actionsIcon1);
      const actionText2 = scene.add.text(x + 50, y + 35, '+ 10', { font: '8px pixelFont', color: '#ffff' });
      actionText2.setDepth(40);
      const actionsIcon2 = scene.add.image(x + 40, y + 40, starIcon)
        .setDepth(40);
      windowGroup.add(actionText2);
      windowGroup.add(actionsIcon2);
    }
    windowGroup.add(BG);
    windowGroup.add(levelUpText);
    windowGroup.add(mainCharPortrait);
    windowGroup.add(rhPortrait);
    windowGroup.add(hpIcon1);
    windowGroup.add(hpIcon2);
    windowGroup.add(damageIcon1);
    windowGroup.add(damageIcon2);
    windowGroup.add(hpText);
    windowGroup.add(hpText2);
    windowGroup.add(attackText);
    windowGroup.add(attackText2);

    const groupChildren = windowGroup.getChildren();
    groupChildren.forEach(child => {
      child.setScrollFactor(0);
    });
    return windowGroup;
  };

  return {
    createTextBox,
    fadeOutScene,
    createAnims,
    setFullScreen,
    displayHudElements,
    createMonster,
    selectEnemies,
    showLevelUpWindow,
  };
})();

export default utils;