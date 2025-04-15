const User = require("../controllers/userControllers");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async function ({ userInput }, req) {
    const { username, password, name, gender, pronouce, dob, phone, email } =
      userInput;

    console.log(userInput);
    let hashedPassword;
    console.log("Call this");
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_VALUE));
      hashedPassword = await bcrypt.hash(password, salt);
    } catch (err) {
      const error = new Error("Something wrong with server");
      error.status = 500;
      throw error;
    }

    try {
      const newUser = await User.create(
        username,
        hashedPassword,
        name,
        gender,
        pronouce,
        dob,
        phone,
        email
      );

      console.log(newUser);
      return newUser;
    } catch (err) {
      throw err;
    }
  },
  findUser: async function ({ userInput }, req) {
    const { username, password } = userInput;

    try {
      const foundUser = await User.find(username, password);
      return foundUser;
    } catch (err) {
      throw err;
    }
  },
};
