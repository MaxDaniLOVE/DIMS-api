const mongoose = require('mongoose');
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

  const result = await createdTask.save();

  res.json(convertTaskData(result));
};

const getTasks = async (req, res, next) => {
  const tasks = await Task.find().exec();
  const convertedTasks = tasks.map((task) => convertTaskData(task));
  res.json(convertedTasks);
};

const getTaskById = async (req, res, next) => {
  const taskId = req.params.tid; 
  const task = await Task.findById(taskId).exec();
  res.json(convertTaskData(task));
};

const deleteTaskById = async (req, res, next) => {
  const taskId = req.params.tid; 
  await Task.findByIdAndDelete(taskId);
  res.json({ message: `successfully delete task with id ${taskId}` });
};

const editTask = async (req, res, next) => {
  const { TaskId, ...updatedData } = req.body;
  await Task.findByIdAndUpdate(TaskId, updatedData);
  res.json({ message: `successfully update task with id ${TaskId}` });
};

exports.createTask = createTask;
exports.getTasks = getTasks;
exports.getTaskById = getTaskById;
exports.deleteTaskById = deleteTaskById;
exports.editTask = editTask;