const MongoClient = require('mongodb').MongoClient;

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

exports.createProfile = createProfile;
exports.getProfiles = getProfiles;