const sendMailToCustomer = async (transporter, body) => {
  const { sender } = body;

  const result = await transporter.sendMail({
    from: process.env.EMAIL,
    to: sender,
    subject: 'It looks like you want to hire me!',
    text: "Hi, I've recieved your message and I will right you back as soon as it possible",
  });

  return result;
};

module.exports = sendMailToCustomer;