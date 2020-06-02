const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  UserId: { type: String, required: true, validate: /.{24,}/ },
  TaskId: { type: String, required: true, validate: /.{24,}/ },
  TrackNote: { type: String, required: true, validate: /^(.|\s){10,}$/ },
  TrackDate: { type: String, required: true, validate: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/},
});

module.exports = mongoose.model('Track', trackSchema);