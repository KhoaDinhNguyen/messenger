const sgMail = require("@sendgrid/mail");

require("dotenv").config();
sgMail.setApiKey("SG." + process.env.EMAIL_API_KEY);

module.exports = {
  sendFeedback: async function ({ ContactInput }, req) {
    const { name, phone, email, message } = ContactInput;

    const html = `
    <div>
      <p>Feedback from ${name}</p>
      <p>Email address: ${email}</p>
      <p>Phone number: ${phone}</p>
    </div>
    <div>
      <p>${message}</p>
    </div>
    `;

    const emailMessage = {
      to: process.env.EMAIL_FROM,
      from: process.env.EMAIL_FROM,
      subject: `Feedback from ${name} - ${phone}`,
      html: html,
    };

    sgMail
      .send(emailMessage)
      .then((response) => {
        console.log("Email has been sent");

        const replyHtml = `
          <div>
            <p>We have received your message. Thank you for your feedback ${name}.</p>
          </div>
          `;
        const replyEmailMessage = {
          to: email,
          from: process.env.EMAIL_FROM,
          subject: `no-reply`,
          html: replyHtml,
        };

        sgMail
          .send(replyEmailMessage)
          .then((response) => {
            console.log("Reply email has been sent");
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });

    return {
      name: name,
      phone: phone,
      email: email,
      message: message,
    };
  },
};
