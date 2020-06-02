const Task = require('../models/task');
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
  const taskId = req.params.tid; 

  try {
    await Task.findByIdAndDelete(taskId);
  } catch (error) {
    return next(error);
  }
  
  res.json({ message: `successfully delete task with id ${taskId}` });
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