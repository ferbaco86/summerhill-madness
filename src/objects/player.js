import Unit from './unit';

export default class Player extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame, type, hp, damage);
    this.setScale(3);
    scene.add.existing(this);
  }
}