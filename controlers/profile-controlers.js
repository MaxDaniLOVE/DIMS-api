const mongoose = require('mongoose');
const convertProfileData = require('../utils/convertProfileData');
const Profile = require('../models/profile');

mongoose
  .connect(process.env.API_KEY, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('connected to db'))
  .catch(() => console.log('connection failed'));

const createProfile  = async (req, res, next) => {
  const {
    Name,
    LastName,
    Email,
    DirectionId,
    Sex,
    Education,
    BirthDate,
    UniversityAverageScore,
    MathScore,
    Address,
    MobilePhone,
    Skype,
    StartDate
  }
   = req.body;
  const createdProfile = new Profile({
    Name,
    LastName,
    Email,
    DirectionId,
    Sex,
    Education,
    BirthDate,
    UniversityAverageScore,
    MathScore,
    Address,
    MobilePhone,
    Skype,
    StartDate
  });

  const result = await createdProfile.save();

  res.json(convertProfileData(result));
};

const getProfiles = async (req, res, next) => {
  const profiles = await Profile.find().exec(); // ! .exec returns Promise
  const convertedProfiles = profiles.map((profile) => convertProfileData(profile));
  res.json(convertedProfiles);
};

const getProfileById = async (req, res, next) => {
  const profileId = req.params.pid; 
  const profile = await Profile.findById(profileId).exec();
  res.json(convertProfileData(profile));
};

const deleteProfileById = async (req, res, next) => {
  const profileId = req.params.pid; 
  await Profile.findByIdAndDelete(profileId);
  res.json({ message: `successfully delete user with id ${profileId}` });
};

const editProfile = async (req, res, next) => {
  const profileId = req.params.pid; 
  await Profile.findByIdAndUpdate(profileId, req.body);
  res.json({ message: `successfully update user with id ${profileId}` });
};

exports.createProfile = createProfile;
exports.getProfiles = getProfiles;
exports.getProfileById = getProfileById;
exports.deleteProfileById = deleteProfileById;
exports.editProfile = editProfile;