const mongoose = require('mongoose');

const userTaskSchema = new mongoose.Schema({
  UserId: { type: String, required: true },
  TaskId: { type: String, required: true },
  TaskName: { type: String, required: true },
  Description: { type: String, required: true },
  StartDate: { type: String, required: true },
  DeadlineDate: { type: String, required: true },
  StatusId: { type: Number, required: true }
});

module.exports = mongoose.model('UserTask', userTaskSchema);