const { buildSchema } = require("graphql");
const userRoutes = require("../schema/userSchema");

const schema = buildSchema(`
  ${userRoutes.UserType}
  ${userRoutes.UserInputType}

  type RootMutation {
    ${userRoutes.createUser}
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
