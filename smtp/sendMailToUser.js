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
      Use default password <${password}> to sign-in the Dev-Incubator managment system.
      You can always change your password by clicking your login, when you're signed-in.
      Link: https://dims-5.netlify.app/
    `,
  });

  return result;
};

module.exports = sendMailToUser;