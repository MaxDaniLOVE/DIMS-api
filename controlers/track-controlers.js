const Track = require('../models/track');
const Profile = require('../models/profile');
const Task = require('../models/task');
const convertTrackData = require('../utils/convertTrackData');
const checkIfFulfilled = require('../utils/checkIfFulfilled');

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
  const UserId = req.params.pid;
  let allTracks;

  try {
    const tracks = await Track.find({ UserId }).exec();
    const { Name: UserName } = await Profile.findById(UserId, 'Name');
    const convertedTracks = tracks.map( async (track) => {
      const convertedData = convertTrackData(track);
      const { Name: TaskName } = await Task.findById(convertedData.TaskId, 'Name').exec();
      return { ...convertedData, UserName, TaskName };
    });
    allTracks = await Promise.allSettled(convertedTracks);
  } catch (error) {
    return next(error);
  }

  await res.json(checkIfFulfilled(allTracks));
};

const editTracks  = async (req, res, next) => {
  const { TaskTrackId, ...updatedData } = req.body;

  try {
    await Track.findByIdAndUpdate(TaskTrackId, updatedData, { runValidators: true });
  } catch (error) {
    return next(error);
  }

  res.json({ message: `successfully update track with id ${TaskTrackId}` });
};

const deleteTrack  = async (req, res, next) => {
  const taskTrackId = req.params.tid; 

  try {
    await Track.findByIdAndDelete(taskTrackId);
  } catch (error) {
    return next(error);
  }

  res.json({ message: `successfully delete track with id ${taskTrackId}` });
};

exports.addtUserTrack = addtUserTrack;
exports.getUserTracks = getUserTracks;
exports.editTracks = editTracks;
exports.deleteTrack = deleteTrack;