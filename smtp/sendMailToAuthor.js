const transporter = require('./transporter');

const sendMailToAuthor = async (body) => {
  const { message, email, fullName } = body;

  const result = await transporter.sendMail({
    from: `${email} <${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    subject: `${fullName.toUpperCase()} WANTS TO HIRE YOU!`,
    text: `
      Message: ${message}
      Email: ${email}
    `,
  });

  return result;
};

module.exports = sendMailToAuthor;