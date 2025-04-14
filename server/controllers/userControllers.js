const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

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

    let client;
    let hashedPassword;

    try {
      client = await MongoClient.connect(process.env.DATABASE_CONNECTION);
      const salt = await bcrypt.genSalt(Number(process.env.SALT_VALUE));
      hashedPassword = await bcrypt.hash(password, salt);
    } catch (err) {
      const error = new Error("Something wrong with database");
      error.status = 500;
      throw error;
    }

    const newUser = {
      username: username,
      password: hashedPassword,
      lastName: lastName,
      firstName: firstName,
      gender: gender,
      dob: dob,
      phoneNumber: phoneNumber,
      email: email,
    };

    try {
      const result = await client.db().collection("users").insertOne(newUser);

      if (result.acknowledged) {
        //send email
      }

      return newUser;
    } catch (err) {
      const error = new Error("Duplicated key");
      error.status = 400;
      throw error;
    }
  },
};

const User = {
  create: async function (
    username,
    password,
    lastName,
    firstName,
    gender,
    dob,
    phoneNumber,
    email
  ) {
    let client;

    try {
      client = await MongoClient.connect(process.env.DATABASE_CONNECTION);
    } catch (err) {
      const error = new Error("Something wrong with database");
      error.status = 500;
      throw error;
    }

    const newUser = {
      username: username,
      password: password,
      lastName: lastName,
      firstName: firstName,
      gender: gender,
      dob: dob,
      phoneNumber: phoneNumber,
      email: email,
    };

    try {
      const result = await client.db().collection("users").insertOne(newUser);

      if (result.acknowledged) {
        //send email
      }

      newUser.password = null;
      return newUser;
    } catch (err) {
      const error = new Error("Duplicated key");
      error.status = 400;
      throw error;
    }
  },
};

module.exports = User;
