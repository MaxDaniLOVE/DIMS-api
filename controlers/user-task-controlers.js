const UserTask = require('../models/userTask');
const Task = require('../models/task');
const convertUserTaskData = require('../utils/convertUserTaskData');

const getUserTasks = async (req, res, next) => {
  const recievedId = req.params.pid; 
  const tasks = await UserTask.find({ UserId: recievedId }).exec();
  const convertedTasks = tasks.map((task) => convertUserTaskData(task));
  res.json(convertedTasks);
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
    const createdUserTask = new UserTask({ UserId, TaskId, TaskName, StatusId: 1, ...data });
    await createdUserTask.save();
  })
  res.json({ message: "all users recieve new tasks with status 'Active'" });
};

exports.getUserTasks = getUserTasks;
exports.setTaskStatus = setTaskStatus;
exports.addTaskToUser = addTaskToUser;