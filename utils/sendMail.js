const nodemailer = require('nodemailer');

const sendMail = async (req, res, next) => {
  const { text, subject, sender } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  let result;

  try {
    result = await transporter.sendMail({
      from: `${sender} <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject,
      text,
    });

    result = await transporter.sendMail({
      from: process.env.EMAIL,
      to: sender,
      subject: 'It looks like you want to hire me!',
      text: 'Hi, I recieve your meassage and I will right you back as soon as it possible',
    });
  } catch (error) {
    return next(error);
  }
  
  res.json(result);
};

module.exports = sendMail;
