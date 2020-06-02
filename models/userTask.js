const mongoose = require('mongoose');

const userTaskSchema = new mongoose.Schema({
  UserId: { type: String, required: true, validate: /.{24,}/ },
  TaskId: { type: String, required: true, validate: /.{24,}/ },
  StatusId: { type: Number, required: true, validate:  /[1-3]{1}/ },
});

module.exports = mongoose.model('UserTask', userTaskSchema);