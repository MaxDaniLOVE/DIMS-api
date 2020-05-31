const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true },
  DirectionId: { type: Number, required: true },
  Sex: { type: String, required: true },
  Education: { type: String, required: true },
  BirthDate: { type: String, required: true },
  UniversityAverageScore: { type: Number, required: true },
  MathScore: { type: Number, required: true },
  Address: { type: String, required: true },
  MobilePhone: { type: String, required: true },
  Skype: { type: String, required: true },
  StartDate: { type: String, required: true },
});

module.exports = mongoose.model('Profile', profileSchema);