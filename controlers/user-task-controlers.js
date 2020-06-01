const UserTask = require('../models/userTask');
const Task = require('../models/task');
const convertUserTaskData = require('../utils/convertUserTaskData');

const getUserTasks = async (req, res, next) => {
  const UserId = req.params.pid; 
  const tasks = await UserTask.find({ UserId }).exec();

  const convertedTasks = tasks.map(async ({ _doc: { TaskId, ...userTaskData } }) => {
    const taskData = await Task.findById(TaskId).exec();
    const { Name: TaskName, ...data } = taskData._doc;
    const fullTaskData = { TaskName, UserId, TaskId, ...data, ...userTaskData };
    const convertedTask = convertUserTaskData(fullTaskData);
    return convertedTask;
  });

  const userTasks = await Promise.all(convertedTasks);

  res.json(userTasks);
};

const setTaskStatus = async (req, res, next) => {
  const {
    UserId,
    TaskId,
    StatusId,
  }
   = req.body;
  const { _id: UserTaskId } = await UserTask.findOne({ UserId, TaskId }).exec();
  await UserTask.findByIdAndUpdate(UserTaskId, { StatusId });
  res.json({ message: 'succesfully updated' });
};

const addTaskToUser  = async (req, res, next) => {
  const TaskId = req.params.tid;
  const usersIds = req.body;
  const { _doc: { Name: TaskName, _id, __v, ...data } } = await Task.findById(TaskId).exec();
  usersIds.map(async (UserId) => {
    const isExists = await UserTask.exists({ TaskId });
    if (isExists) {
      return null;
    }
    const createdUserTask = new UserTask({ UserId, TaskId, TaskName, StatusId: 1, ...data });
    await createdUserTask.save();
  })
  res.json({ message: "all users recieve new tasks with status 'Active'" });
};

const getAssignedUsers  = async (req, res, next) => {
  const TaskId = req.params.tid;

  const result = await UserTask.find({ TaskId }, 'UserId').exec();
  
  const assignedUser = result.map(({ UserId }) => UserId);

  res.json(assignedUser);
};

exports.getUserTasks = getUserTasks;
exports.setTaskStatus = setTaskStatus;
exports.addTaskToUser = addTaskToUser;
exports.getAssignedUsers = getAssignedUsers;