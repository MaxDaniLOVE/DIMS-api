const convertDataToAge = require('./convertDataToAge');

const convertProfileData = (profile) => {
  const { _id, Name, LastName, BirthDate, __v, ...data } = profile._doc;
  return { UserId: _id, FullName: Name + ' ' + LastName, Age: convertDataToAge(BirthDate), ...data };
}

module.exports = convertProfileData;
