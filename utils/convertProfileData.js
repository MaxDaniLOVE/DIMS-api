const convertDataToAge = require('./convertDataToAge');
const directions = require('./directions');

const convertProfileData = (profile) => {
  const { _id, Name, LastName, BirthDate, __v, DirectionId, ...data } = profile._doc;
  return {
    UserId: _id,
    FullName: `${Name} ${LastName}`,
    Direction: directions[DirectionId],
    Age: convertDataToAge(BirthDate),
    ...data
  };
}

module.exports = convertProfileData;
