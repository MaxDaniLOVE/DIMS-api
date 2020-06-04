const Task = require('../models/task');
const Track = require('../models/track');
const UserTask = require('../models/userTask');
const convertTaskData = require('../utils/convertTaskData')

const createTask  = async (req, res, next) => {
  const {
    Name,
    Description,
    StartDate,
    DeadlineDate,
  }
   = req.body;
  
  const createdTask = new Task({
    Name,
    Description,
    StartDate,
    DeadlineDate,
  });

  let result;

  try {
    result = await createdTask.save();
  } catch (error) {
    return next(error);
  }

  res.json(convertTaskData(result));
};

const getTasks = async (req, res, next) => {
  let tasks;

  try {
    tasks = await Task.find().exec();
  } catch (error) {
    return next(error);
  }
  
  const convertedTasks = tasks.map((task) => convertTaskData(task));
  res.json(convertedTasks);
};

const getTaskById = async (req, res, next) => {
  const taskId = req.params.tid;
  let task;

  try {
    task = await Task.findById(taskId).exec();
  } catch (error) {
    return next(error);
  }

  res.json(convertTaskData(task));
};

const deleteTaskById = async (req, res, next) => {
  const TaskId = req.params.tid; 

  try {
    await Task.findByIdAndDelete(TaskId);
    const tracksToDelete = await Track.find({ TaskId }, '_id');
    const tasksToDelete = await UserTask.find({ TaskId }, '_id');
    tracksToDelete.map( async ({ _id }) => await Track.findByIdAndDelete(_id));
    tasksToDelete.map( async ({ _id }) => await UserTask.findByIdAndDelete(_id));
  } catch (error) {
    return next(error);
  }
  
  res.json({ message: `successfully delete task with id ${TaskId}` });
};

const editTask = async (req, res, next) => {
  const { TaskId, ...updatedData } = req.body;

  try {
    await Task.findByIdAndUpdate(TaskId, updatedData, { runValidators: true });
  } catch (error) {
    return next(error);
  }
  
  res.json({ message: `successfully update task with id ${TaskId}` });
};

exports.createTask = createTask;
exports.getTasks = getTasks;
exports.getTaskById = getTaskById;
exports.deleteTaskById = deleteTaskById;
exports.editTask = editTask;