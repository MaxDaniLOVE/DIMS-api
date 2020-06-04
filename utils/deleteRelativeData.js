const Track = require('../models/track');
const UserTask = require('../models/userTask');

const deleteRelativeData = async (recievedId, isFindByUserId = false) => {
  const queryObject = isFindByUserId ? { UserId: recievedId } : { TaskId: recievedId } ;

  try {
    const tracksToDelete = await Track.find(queryObject, '_id');
    const tasksToDelete = await UserTask.find(queryObject, '_id');
    tracksToDelete.map( async ({ _id }) => await Track.findByIdAndDelete(_id));
    tasksToDelete.map( async ({ _id }) => await UserTask.findByIdAndDelete(_id));
  } catch (error) {
    throw new Error("Can't delete relative data");
  }
  
};

module.exports = deleteRelativeData;