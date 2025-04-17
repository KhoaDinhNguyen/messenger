const { buildSchema } = require("graphql");
const userRoutes = require("../schema/userSchema");

const schema = buildSchema(`
  ${userRoutes.UserType}
  ${userRoutes.UserInputTypeSignUp}
  ${userRoutes.UserInputTypeLogin}

  type RootMutation {
    ${userRoutes.createUser}
  }

  type RootQuery {
    hello: String
    ${userRoutes.findUser}
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
