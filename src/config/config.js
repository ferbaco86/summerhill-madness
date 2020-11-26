import Phaser from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import MoveToPlugin from 'phaser3-rex-plugins/plugins/moveto-plugin';

export default {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'content',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 608,
  },
  plugins: {
    scene: [{
      key: 'rexUI',
      plugin: UIPlugin,
      mapping: 'rexUI',
    },
    ],
    global: [{
      key: 'rexMoveTo',
      plugin: MoveToPlugin,
      start: true,
    },
      // ...
    ],
  },
  render: {
    pixelArt: true, antialias: false,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
};