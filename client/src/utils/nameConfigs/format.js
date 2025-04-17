const formatName = (firstName, middleName, lastName) => {
  let middleIni = middleName.substr(0, 1).toUpperCase() + ".";

  return `${firstName} ${middleIni} ${lastName}`;
};

export { formatName };
