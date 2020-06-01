const taskStates = require('./taskStates');

const convertUserTaskData = (task) => {
  const { _id, __v, StatusId, ...data } = task._doc;
  return {
    State: taskStates[StatusId],
    ...data
  };
}

module.exports = convertUserTaskData;
