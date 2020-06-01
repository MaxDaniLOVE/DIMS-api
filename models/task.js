const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
  StartDate: { type: String, required: true },
  DeadlineDate: { type: String, required: true },
});

module.exports = mongoose.model('Task', taskSchema);