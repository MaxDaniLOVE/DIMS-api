const transporter = require('./transporter');

const sendMailToUser = async (body) => {
  const { email, password, name } = body;

  const result = await transporter.sendMail({
    from: `Dev-incubator management system <${process.env.EMAIL}>`,
    to: email,
    subject: "You've been added to DIMS!",
    text: `
      Hi, ${name}!
      You've been added to DIMS!
      Default password: ${password}
      Link: https://dims-5.netlify.app/email:${email},pass:${password}
    `,
  });

  return result;
};

module.exports = sendMailToUser;