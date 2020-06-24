const sendMailToCustomer = async (transporter, body) => {
  const { email, fullName } = body;

  const result = await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: 'It looks like you want to hire me!',
    text: `
      Hi, ${fullName}!
      I've recieved your message and I will write you back as soon as it possible!
      If you have urgent questions, just call me +375291371931.
      Regards, Maks Danilau!
    `,
  });

  return result;
};

module.exports = sendMailToCustomer;