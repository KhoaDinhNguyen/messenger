function getPronounce(gender, pronounce) {
  if (gender === "male") {
    return "He/Him/His";
  } else if (gender === "female") {
    return "She/Her/Her";
  } else {
    return pronounce;
  }
}

export { getPronounce };
