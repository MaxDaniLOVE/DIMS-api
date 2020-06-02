const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  Name: { type: String, required: true, validate: /.{3,}/ },
  Description: { type: String, required: true, validate: /^(.|\s){10,}$/ },
  StartDate: { type: String, required: true, validate: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/ },
  DeadlineDate: { type: String, required: true, validate: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/},
});

module.exports = mongoose.model('Task', taskSchema);