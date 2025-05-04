function getRandomString(length) {
  const characters = "abcdefghiklmnopqrstuvwxyz0123456789";
  const charLength = 36;

  let randomString = "";

  for (let i = 0; i < length; ++i) {
    const idx = Math.floor(Math.random() * charLength);
    randomString += characters[idx];
  }

  return randomString;
}

export { getRandomString };
