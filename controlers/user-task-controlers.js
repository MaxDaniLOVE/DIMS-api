const UserTask = require('../models/userTask');
const Task = require('../models/task');
const convertUserTaskData = require('../utils/convertUserTaskData');
const checkIfFulfilled = require('../utils/checkIfFulfilled');

const getUserTasks = async (req, res, next) => {
  const UserId = req.params.pid;
  let userTasks;

  try {
    const tasks = await UserTask.find({ UserId }).exec();

    const convertedTasks = tasks.map(async ({ _doc: { TaskId, ...userTaskData } }) => {
      const taskData = await Task.findById(TaskId).exec();
      const { Name: TaskName, ...data } = taskData._doc;
      const fullTaskData = { TaskName, UserId, TaskId, ...data, ...userTaskData };
      const convertedTask = convertUserTaskData(fullTaskData);
      return convertedTask;
    });

    userTasks = await Promise.allSettled(convertedTasks);
  } catch (error) {
    return next(error);
  }

  res.json(checkIfFulfilled(userTasks));
};

const setTaskStatus = async (req, res, next) => {
  const {
    UserId,
    TaskId,
    StatusId,
  }
   = req.body;

  try {
    const { _id: UserTaskId } = await UserTask.findOne({ UserId, TaskId }).exec();
    await UserTask.findByIdAndUpdate(UserTaskId, { StatusId });
  } catch (error) {
    return next(error);
  }
 
  res.json({ message: 'succesfully updated' });
};

const addTaskToUser  = async (req, res, next) => {
  const TaskId = req.params.tid;
  const usersIds = req.body;

  try {
    usersIds.map(async (UserId) => {
      const isExists = await UserTask.exists({ TaskId, UserId });
      if (isExists) {
        return null;
      }
      const createdUserTask = new UserTask({ UserId, TaskId, StatusId: 1 });
      await createdUserTask.save();
    })
  } catch (error) {
    return next(error);
  }
  
  res.json({ message: "all users recieve new tasks with status 'Active'" });
};

const getAssignedUsers  = async (req, res, next) => {
  const TaskId = req.params.tid;

  let result;

  try {
    result = await UserTask.find({ TaskId }, 'UserId').exec();
  } catch (error) {
    return next(error);
  }

  const assignedUser = result.map(({ UserId }) => UserId);

  res.json(assignedUser);
};

exports.getUserTasks = getUserTasks;
exports.setTaskStatus = setTaskStatus;
exports.addTaskToUser = addTaskToUser;
exports.getAssignedUsers = getAssignedUsers;