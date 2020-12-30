const message = (() => {
  const displayMessage = (scene, x, y, message) => {
    const messageContainer = scene.add.container(x, y);
    const messageFrame = scene.add.image(0, 0, 'messageBattleUI');
    const text = scene.add.text(0, 0, message, {
      color: '#ffffff', align: 'center', fontSize: 30, fontFamily: 'pixelFont', wordWrap: { width: 400, useAdvancedWrap: true },
    });
    messageFrame.setOrigin(0.5);
    text.setOrigin(0.5);
    messageContainer.add(messageFrame);
    messageContainer.add(text);
    return messageContainer;
  };
  return {
    displayMessage,
  };
})();

export default message;