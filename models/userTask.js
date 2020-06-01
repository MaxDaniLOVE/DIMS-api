const mongoose = require('mongoose');

const userTaskSchema = new mongoose.Schema({
  UserId: { type: String, required: true },
  TaskId: { type: String, required: true },
  StatusId: { type: Number, required: true }
});

module.exports = mongoose.model('UserTask', userTaskSchema);