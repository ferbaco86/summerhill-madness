
const charMovement = (() => {
  const charMovementControl = (char, cursors, speed, rightVelocity,
    leftVelocity, upVelocity, downVelocity, animationsObj, idleFrame) => {
    const prevVelocity = char.body.velocity.clone();
    char.body.setVelocity(0);


    // Horizontal movement
    if (cursors.left.isDown) {
      char.body.setVelocityX(leftVelocity);
    } else if (cursors.right.isDown) {
      char.body.setVelocityX(rightVelocity);
    }

    // Vertical movement
    if (cursors.up.isDown) {
      char.body.setVelocityY(upVelocity);
    } else if (cursors.down.isDown) {
      char.body.setVelocityY(downVelocity);
    }

    char.body.velocity.normalize().scale(speed);

    if (cursors.left.isDown) {
      char.anims.play(animationsObj.left.animationKey, true);
    } else if (cursors.right.isDown) {
      char.anims.play(animationsObj.right.animationKey, true);
    } else if (cursors.up.isDown) {
      char.anims.play(animationsObj.up.animationKey, true);
    } else if (cursors.down.isDown) {
      char.anims.play(animationsObj.down.animationKey, true);
    } else {
      char.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0) char.setTexture(animationsObj.left.spriteKey, idleFrame);
      else if (prevVelocity.x > 0) char.setTexture(animationsObj.right.spriteKey, idleFrame);
      else if (prevVelocity.y < 0) char.setTexture(animationsObj.up.spriteKey, idleFrame);
      else if (prevVelocity.y > 0) char.setTexture(animationsObj.down.spriteKey, idleFrame);
    }
  };


  return {
    charMovementControl,
  };
})();

export default charMovement;
