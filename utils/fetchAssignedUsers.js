const UserTask = require('../models/userTask');

const fetchAssignedUsers = async (TaskId) => {
  let result;

  try {
    result = await UserTask.find({ TaskId }, 'UserId').exec();
  } catch (error) {
    throw new Error("Can't load assigned members");
  }

  const assignedUsers = result.map(({ UserId }) => UserId);

  return assignedUsers;
}

module.exports = fetchAssignedUsers;
