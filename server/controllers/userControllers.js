const mongodb = require("mongodb");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");

const MongoClient = mongodb.MongoClient;

require("dotenv").config();
sgMail.setApiKey("SG." + process.env.EMAIL_API_KEY);

module.exports = {
  createUser: async function ({ userInput }, req) {
    const { username, password, name, gender, pronounce, dob, phone, email } =
      userInput;

    let client;

    try {
      client = await MongoClient.connect(process.env.DATABASE_CONNECTION);
    } catch (e) {
      const err = new Error("Something wrong with database");
      err.status = 500;
      throw err;
    }

    let hashedPassword;
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_VALUE));
      hashedPassword = await bcrypt.hash(password, salt);
    } catch (err) {
      const error = new Error("Something wrong with server");
      error.status = 500;
      throw error;
    }

    const emailSave = !email || email === "" ? null : email;
    const phoneSave = !phone || phone === "" ? null : phone;
    const pronounceSave = !pronounce || pronounce === "" ? null : pronounce;

    const newUser = {
      username: username,
      password: hashedPassword,
      name: name,
      gender: gender,
      pronounce: pronounceSave,
      dob: dob,
      phone: phoneSave,
      email: emailSave,
    };

    try {
      await client.db().collection("users").insertOne(newUser);
    } catch (err) {
      if (err.message.includes("username_1 dup key")) {
        const error = new Error("Username has existed");
        error.code = 400;
        throw error;
      } else if (err.message.includes("email_1 dup key")) {
        const error = new Error("Email has been used");
        error.code = 400;
        throw error;
      } else {
        throw err;
      }
    }

    if (emailSave !== null) {
      const message = {
        to: emailSave,
        from: process.env.EMAIL_FROM,
        subject: "Sign up successfully",
        text: `Hello ${name}, you have signed up message`,
        html: `<h1>Hello ${name}, you have signed up message</h1>`,
      };

      sgMail
        .send(message)
        .then((response) => {
          console.log("Email has been send");
        })
        .catch((err) => {
          console.log(err.message);
          client
            .db()
            .collection("users")
            .updateOne({ username: username }, { $set: { email: null } });
        });
    }

    newUser.password = null;

    return newUser;
  },

  findUser: async function ({ userInput }, req) {
    const { username, password } = userInput;

    let client;
    try {
      client = await MongoClient.connect(process.env.DATABASE_CONNECTION);
    } catch (e) {
      const err = new Error("Something wrong with database");
      err.status = 500;
      throw err;
    }

    let foundUser;
    try {
      foundUser = await client
        .db()
        .collection("users")
        .findOne({ username: username });
    } catch (e) {
      const err = new Error("Something wrong with database");
      err.status = 500;
      throw err;
    }

    if (!foundUser) {
      const error = new Error("User does not exist");
      error.status = 400;
      throw error;
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      const error = new Error("Password is incorrect");
      error.status = 400;
      throw error;
    }

    foundUser.password = null;
    return foundUser;
  },
};
