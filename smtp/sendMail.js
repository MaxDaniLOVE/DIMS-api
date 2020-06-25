const sendMailToAuthor = require('./sendMailToAuthor');
const sendMailToCustomer = require('./sendMailToCustomer');
const sendMailToUser = require('./sendMailToUser');
const transporter = require('./transporter');

const sendAuthorMail = async (req, res, next) => {
  const { body } = req;

  let toAuthor;
  let toCustomer;

  try {
    toAuthor = await sendMailToAuthor(body);
  } catch (error) {
    return next(error);
  };

  try {
    toCustomer = await sendMailToCustomer(body);
  } catch (error) {
    return next(error);
  }
  
  res.json({ toAuthor, toCustomer });
};

const sendUserMail = async (req, res, next) => {
  const { body } = req;

  let toUser;

  try {
    toUser = await sendMailToUser(body);
  } catch (error) {
    return next(error);
  };
  
  res.json({ toUser });
};

exports.sendAuthorMail = sendAuthorMail;
exports.sendUserMail = sendUserMail;
