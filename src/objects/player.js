import Unit from './unit';

export default class Player extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage, avatar) {
    super(scene, x, y, texture, frame, type, hp, damage, avatar);
    this.setScale(3);
    scene.add.existing(this);
    this.type = type;
    this.avatar = avatar;
  }
}