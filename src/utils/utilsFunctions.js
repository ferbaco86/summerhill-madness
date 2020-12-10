import Phaser from 'phaser';
import HudDisplay from '../objects/hudDisplay';


const utils = (() => {
  const { GetValue } = Phaser.Utils.Objects;

  const getBBcodeText = (scene, wrapWidth, fixedWidth, fixedHeight) => scene.rexUI.add.BBCodeText(0, 0, '', {
    fixedWidth,
    fixedHeight,
    fontSize: '26px',
    fontFamily: 'pixelFont',
    wrap: {
      mode: 'word',
      width: wrapWidth,
    },
    maxLines: 2,
  });

  const createTextBox = (scene, x, y, config, window, icon, speechFX, eventEmit = null) => {
    const wrapWidth = GetValue(config, 'wrapWidth', 0);
    const fixedWidth = GetValue(config, 'fixedWidth', 0);
    const fixedHeight = GetValue(config, 'fixedHeight', 0);
    const textBox = scene.rexUI.add.textBox({
      x,
      y,

      background: scene.add.image(0, 0, window),
      icon: scene.add.image(0, 0, icon).setScale(2),
      iconMask: false,
      text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

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

    textBox
      .setInteractive()
      .on('pointerdown', () => {
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
      }, textBox)
      .on('pageend', () => {
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
      }, textBox)
      .on('type', () => {
        speechFX.play();
      });
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

  return {
    createTextBox,
    fadeOutScene,
    createAnims,
    setFullScreen,
    displayHudElements,
  };
})();

export default utils;