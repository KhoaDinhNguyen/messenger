const mongodb = require("mongodb");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const User = require("../models/user");
const MongoClient = mongodb.MongoClient;

require("dotenv").config();
sgMail.setApiKey("SG." + process.env.EMAIL_API_KEY);

module.exports = {
  createUser: async function ({ userInput }, req) {
    const { username, password, name, gender, pronounce, dob, phone, email } =
      userInput;

    let hashedPassword;
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_VALUE));
      hashedPassword = await bcrypt.hash(password, salt);
    } catch (err) {
      const error = new Error("Something wrong with server");
      error.status = 500;
      throw error;
    }

    const emailSave = !email ? "" : email;
    const phoneSave = !phone ? "" : phone;
    const pronounceSave = !pronounce ? "" : pronounce;
    const errors = [];

    const doc = await User.exists({ username: username });
    if (doc !== null) {
      errors.push("Username has existed");
    }

    if (emailSave !== "") {
      const doc = await User.exists({ email: emailSave });
      if (doc !== null) {
        errors.push("Email has been used");
      }
    }

    if (errors.length > 0) {
      const error = new Error("Invalid user's input");
      error.data = errors;
      error.code = 400;
      throw error;
    }

    const newUser = new User({
      username: username,
      password: hashedPassword,
      name: name,
      gender: gender,
      pronounce: pronounceSave,
      dob: dob,
      phone: phoneSave,
      email: emailSave,
      friends: [],
    });

    try {
      await newUser.save();
    } catch (err) {
      throw err;
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
        .catch(async (err) => {
          newUser.email = "";
          await newUser.save();
        });
    }

    newUser.password = "";

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

    foundUser.password = "";
    return foundUser;
  },
};
