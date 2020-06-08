const convertProfileData = require('../utils/convertProfileData');
const deleteRelativeData = require('../utils/deleteRelativeData');
const Profile = require('../models/profile');

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

  let result;
  try {
    result = await createdProfile.save();
  } catch (error) {
    return next(error);
  };

  res.json(convertProfileData(result));
};

const getProfiles = async (req, res, next) => {
  let profiles;

  try {
    profiles = await Profile.find().exec(); // ! .exec returns Promise
  } catch (error) {
    return next(error);
  };
 
  const convertedProfiles = profiles.map((profile) => convertProfileData(profile));
  res.json(convertedProfiles);
};

const getProfileById = async (req, res, next) => {
  const profileId = req.params.pid; 

  let userData;
  try {
    userData = await Profile.findById(profileId).exec();
  } catch (error) {
    return next(error);
  };

  const { _doc: { _id: UserId, __v, ...data } } = userData;
  res.json({ UserId, ...data });
};

const deleteProfileById = async (req, res, next) => {
  const profileId = req.params.pid;

  try {
    await Profile.findByIdAndDelete(profileId);
    await deleteRelativeData(profileId, true);
  } catch (error) {
    return next(error);
  };
 
  res.json({ message: `successfully delete user with id ${profileId}` });
};

const editProfile = async (req, res, next) => {
  const profileId = req.params.pid;

  try {
    await Profile.findByIdAndUpdate(profileId, req.body, { runValidators: true });
  } catch (error) {
    return next(error);
  }
  
  res.json({ message: `successfully update user with id ${profileId}` });
};

const getProfileDetails = async (req, res, next) => {
  const profileId = req.params.pid; 
  let profile;

  try {
    profile = await Profile.findById(profileId).exec();
  } catch (error) {
    return next(error);
  };

  res.json(convertProfileData(profile));
};

const isProfileExists = async (req, res, next) => {
  const Email = req.params.email; 
  let isExists;

  try {
    const counter = await Profile.countDocuments({ Email }).exec();
    isExists = counter ? true : false;
  } catch (error) {
    return next(error);
  };

  res.json(isExists);
};

exports.createProfile = createProfile;
exports.getProfiles = getProfiles;
exports.getProfileById = getProfileById;
exports.deleteProfileById = deleteProfileById;
exports.editProfile = editProfile;
exports.getProfileDetails = getProfileDetails;
exports.isProfileExists = isProfileExists;