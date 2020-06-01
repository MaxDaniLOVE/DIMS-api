const mongoose = require('mongoose');
const Task = require('../models/task');
const convertTaskData = require('../utils/convertTaskData')


mongoose
  .connect(process.env.API_KEY, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('connected to db'))
  .catch(() => console.log('connection failed'));

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

  res.json(result);
};

const getTasks = async (req, res, next) => {
  const tasks = await Task.find().exec();
  const convertedTasks = tasks.map((task) => convertTaskData(task));
  res.json(convertedTasks);
};

exports.createTask = createTask;
exports.getTasks = getTasks;