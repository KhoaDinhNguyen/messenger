const User = require("../controllers/userControllers");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async function ({ userInput }, req) {
    const {
      username,
      password,
      lastName,
      firstName,
      gender,
      dob,
      phoneNumber,
      email,
    } = userInput;

    let hashedPassword;

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
        lastName,
        firstName,
        gender,
        dob,
        phoneNumber,
        email
      );
      return newUser;
    } catch (err) {
      throw err;
    }
  },
};
