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
  ContactInputType,
  ContactType,
  sendFeedback,
};
