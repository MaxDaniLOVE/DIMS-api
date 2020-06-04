const Track = require('../models/track');

const createFirstTrack = async (UserId, TaskId) => {
  const createdTrack = new Track({
    UserId,
    TaskId,
    TrackNote: 'Recieve new task',
    TrackDate: new Date().toISOString().split('T')[0],
  });
  let result;
  try {
    result = await createdTrack.save();
  } catch (error) {
    throw new Error(error);
  }
  return result;
};

module.exports = createFirstTrack;