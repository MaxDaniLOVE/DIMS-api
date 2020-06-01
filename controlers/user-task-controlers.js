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

exports.createUserTask = createUserTask;