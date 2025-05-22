const { queries, mutations } = require("./postSchema");

const ContactInputType = `
  input ContactTypeInput {
    name: String!
    phone: String
    email: String!
    message: String
  }
`;

const ContactType = `
  type ContactType {
    name: String
    phone: String
    email: String!
    message: String
  }
`;

const sendFeedback = `
  sendFeedback(ContactInput: ContactTypeInput): ContactType!
`;

module.exports = {
  types: [ContactType],
  inputTypes: [ContactInputType],
  queries: [sendFeedback],
  mutations: [],
};
