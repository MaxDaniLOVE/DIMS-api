const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  Name: { type: String, required: true, validate: /[A-za-z]{3,}/ },
  LastName: { type: String, required: true, validate: /[A-za-z]{2,}/ },
  Email: { type: String, required: true, validate: /^\S+@\S+\.\S+$/ },
  DirectionId: { type: Number, required: true, validate: /[1-4]{1}/ },
  Sex: { type: String, required: true, validate: /\M|\F/ },
  Education: { type: String, required: true, validate: /[A-za-z]{3,}/ },
  BirthDate: { type: String, required: true, validate: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/ },
  UniversityAverageScore: { type: Number, required: true, validate: /[0-9]{1}/ },
  MathScore: { type: Number, required: true, validate: /[0-9]{1}/ },
  Address: { type: String, required: true, validate: /.{8,}[^\n]/ },
  MobilePhone: { type: String, required: true, validate: /^\+375[0-9]{9}$/ },
  Skype: { type: String, required: true, validate: /.{6,}/ },
  StartDate: { type: String, required: true, validate: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/ },
});

module.exports = mongoose.model('Profile', profileSchema);