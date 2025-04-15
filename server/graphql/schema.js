const { buildSchema } = require("graphql");
const userRoutes = require("../schema/userSchema");

const schema = buildSchema(`
  ${userRoutes.UserType}
  ${userRoutes.UserInputTypeSignUp}
  ${userRoutes.UserInputTypeLogin}

  type RootMutation {
    ${userRoutes.createUser}
    ${userRoutes.findUser}
  }

  type RootQuery {
    hello: String
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
