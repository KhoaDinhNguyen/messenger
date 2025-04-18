const { buildSchema } = require("graphql");
const userRoutes = require("../schema/userSchema");

const schema = buildSchema(`
  ${userRoutes.UserType}
  ${userRoutes.UserInputTypeSignUp}
  ${userRoutes.UserInputTypeLogin}
  ${userRoutes.UserInputTypeId}
  ${userRoutes.UserInputTypeName}
  
  type RootMutation {
    ${userRoutes.createUser}
  }

  type RootQuery {
    hello: String
    ${userRoutes.findUser}
    ${userRoutes.findUserById}
    ${userRoutes.findUserByName}
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
