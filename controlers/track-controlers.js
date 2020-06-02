const Track = require('../models/track');
const convertTrackData = require('../utils/convertTrackData')
const addtUserTrack  = async (req, res, next) => {
  const {
    UserId,
    TaskId,
    TrackNote,
    TrackDate,
  }
   = req.body;

  const createdTrack = new Track({
    UserId,
    TaskId,
    TrackNote,
    TrackDate,
  });

  let result;
  try {
    result = await createdTrack.save();
  } catch (error) {
    return next(error);
  };

  res.json(convertTrackData(result));
};

const getUserTracks  = async (req, res, next) => {
  console.log('do some things');
};

exports.addtUserTrack = addtUserTrack;
exports.getUserTracks = getUserTracks;