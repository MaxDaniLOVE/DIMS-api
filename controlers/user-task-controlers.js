const mongoose = require('mongoose');
const UserTask = require('../models/userTask');
const convertUserTaskData = require('../utils/convertUserTaskData');

const createUserTask  = async (req, res, next) => {
  const {
    UserId,
    TaskId,
    TaskName,
    Description,
    StartDate,
    DeadlineDate,
    StatusId,
  }
   = req.body;
  
  const createdUserTask = new UserTask({
    UserId,
    TaskId,
    TaskName,
    Description,
    StartDate,
    DeadlineDate,
    StatusId
  });

  const result = await createdUserTask.save();

  res.json(convertUserTaskData(result));
};

const getUserTasks = async (req, res, next) => {
  const recievedId = req.params.pid; 
  const tasks = await UserTask.find({ UserId: recievedId }).exec();
  const convertedTasks = tasks.map((task) => convertUserTaskData(task));
  res.json(convertedTasks);
};

exports.createUserTask = createUserTask;
exports.getUserTasks = getUserTasks;