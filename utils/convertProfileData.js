const directions = require('./directions');

const convertProfileData = (profile) => {
  const { _id, Name, LastName, __v, DirectionId, ...data } = profile._doc;
  return {
    UserId: _id,
    FullName: `${Name} ${LastName}`,
    Direction: directions[DirectionId],
    ...data
  };
}

module.exports = convertProfileData;
