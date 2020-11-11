import Phaser from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

export default {
  type: Phaser.AUTO,
  parent: 'content',
  plugins: {
    scene: [{
      key: 'rexUI',
      plugin: UIPlugin,
      mapping: 'rexUI',
    },
    ],
  },
  pixelArt: true,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 960,
  height: 600,
};