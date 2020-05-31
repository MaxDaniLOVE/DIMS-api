const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbUrl = process.env.API_KEY;

const createProfile = async (req, res, next) => {
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
  const newProfile = {
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
    StartDate,
  };
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection('profiles').insertOne(newProfile);
  } catch (error) {
    return res.json({ message: 'oops' });
  }
  client.close();
  res.json(newProfile);
};

const getProfiles = async (req, res, next) => {
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
  let profiles;
  try {
    await client.connect();
    const db = client.db();
    const allProfiles = await db.collection('profiles').find().toArray();
    profiles = allProfiles.map(({ _id, ...data  }) => ({ UserId: _id, ...data }));
  } catch (error) {
    return res.json({ message: 'oops' });
  }
  client.close();
  res.json(profiles);
};

const getProfileById = async (req, res, next) => {
  const profileId = req.params.pid; 
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
  let profile;
  try {
    await client.connect();
    const db = client.db();
    const profileArray = await db.collection('profiles').find(profileId).toArray();
    const { _id: UserId, ...data } = profileArray[0];
    profile = { UserId, ...data };
  } catch (error) {
    return res.json({ message: 'oops' });
  }
  client.close();
  res.json(profile);
}

const deleteProfileById = async (req, res, next) => {
  const profileId = req.params.pid; 
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db();
    await db.collection('profiles').deleteOne({_id: new ObjectID(profileId)})
  } catch (error) {
    return res.json({ message: 'oops' });
  }

  client.close();
  res.json({ message: `successfully delete user with id ${profileId}` });
}

exports.createProfile = createProfile;
exports.getProfiles = getProfiles;
exports.getProfileById = getProfileById;
exports.deleteProfileById = deleteProfileById;