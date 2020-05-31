const convertDataToAge = require('./convertDataToAge').convertDataToAge;

const convertProfileData = (profile) => {
  const { _id, Name, LastName, BirthDate, ...data } = profile;
  return { UserId: _id, FullName: Name + ' ' + LastName, Age: convertDataToAge(BirthDate), ...data };
}

exports.convertProfileData = convertProfileData;