const UserTask = require('../models/userTask');
const createFirstTrack = require('./createFirstTrack');

const createTaskAndTrack = async (UserId, TaskId) => {
  const createdUserTask = new UserTask({ UserId, TaskId, StatusId: 1 });
  const response = {};

  try {
    const taskResult = await createdUserTask.save();
    const trackResult = await createFirstTrack(UserId, TaskId);
    response.taskResult = taskResult;
    response.trackResult = taskResult;
  } catch (error) {
    throw new Error(error);
  };

  return response;
};

module.exports = createTaskAndTrack;