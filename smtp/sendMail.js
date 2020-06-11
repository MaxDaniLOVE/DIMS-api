const nodemailer = require('nodemailer');
const sendMailToAuthor = require('./sendMailToAuthor');
const sendMailToCustomer = require('./sendMailToCustomer');

const sendMail = async (req, res, next) => {
  const { body } = req;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  let result;

  try {
    result = await sendMailToAuthor(transporter, body);
    result = await sendMailToCustomer(transporter, body);
  } catch (error) {
    return next(error);
  }
  
  res.json(result);
};

module.exports = sendMail;
