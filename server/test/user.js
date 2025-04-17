const createUser1 = `
mutation {
  createUser(
    userInput: {
      username: "tester"
      password: "tester"
      firstName: "khoa"
      lastName: "nguyen"
      email: "tester@tester.com"
      dob: "05-13-2004"
      gender: "male"
    }
  ) {
    _id,
    username,
    password,
    firstName,
    lastName,
    email,
    dob,
    gender
  }
}
`;

const createUser2 = `
mutation {
  createUser(
    userInput: {
      username: "khoa"
      password: "bin"
      firstName: "khoa"
      lastName: "nguyen"
      email: "khoa@tester.com"
      dob: "05-13-2004"
      gender: "male"
    }
  ) {
    _id,
    username,
    password,
    firstName,
    lastName,
    email,
    dob,
    gender
  }
}
`;

const findUser = `
mutation{
  findUser(userInput:{username: "tester", password:"tester"}) {
    username
    password,
    dob,
		firstName,
    lastName
  }
}`;
