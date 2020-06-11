const sendMailToAuthor = async (transporter, body) => {
  const { text, sender } = body;

  const result = await transporter.sendMail({
    from: `${sender} <${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    subject: 'SOMEONE WANT TO HIRE YOU!',
    text,
  });

  return result;
};

module.exports = sendMailToAuthor;