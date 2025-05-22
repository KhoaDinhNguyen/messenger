function formatEmoji(emojiList) {
  const heartArray = [];
  const likeArray = [];
  const funnyArray = [];
  const cryArray = [];
  const angryArray = [];

  for (const emojiItem of emojiList) {
    switch (emojiItem.emoji) {
      case "💖": {
        heartArray.push(emojiItem);
        break;
      }
      case "👍": {
        likeArray.push(emojiItem);
        break;
      }
      case "😂": {
        funnyArray.push(emojiItem);
        break;
      }
      case "😭": {
        cryArray.push(emojiItem);
        break;
      }
      case "😡": {
        angryArray.push(emojiItem);
        break;
      }
      default: {
      }
    }
  }
  return {
    heartArray,
    likeArray,
    funnyArray,
    cryArray,
    angryArray,
  };
}

export { formatEmoji };
