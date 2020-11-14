import Phaser from 'phaser';


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

  return {
    createTextBox,
    fadeOutScene,
    createAnims,
  };
})();

export default utils;