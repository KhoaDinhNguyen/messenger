const mongodb = require("mongodb");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");

const MongoClient = mongodb.MongoClient;
require("dotenv").config();

sgMail.setApiKey("SG." + process.env.EMAIL_API_KEY);

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
    const client = await MongoClient.connect(process.env.DATABASE_CONNECTION);

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

    const result = await client.db().collection("users").insertOne(newUser);

    //send email
    const message = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: "Sign up successfully",
      text: `Hello ${firstName} ${lastName}, you have signed up message`,
      html: `<h1>Hello ${firstName} ${lastName}, you have signed up message</h1>`,
    };

    sgMail.send(message);

    newUser.password = null;
    return newUser;
  },
  find: async function (username, password) {
    const client = await MongoClient.connect(process.env.DATABASE_CONNECTION);

    const foundUser = await client
      .db()
      .collection("users")
      .findOne({ username: username });

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

module.exports = User;
