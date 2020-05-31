const express = require('express');
const bodyParser = require('body-parser');
const dimsMongo = require('./mongo');
const app = express();

app.use(bodyParser.json());

app.post('/api/create', dimsMongo.createProfile)

app.get('/api/profiles', dimsMongo.getProfiles);

app.get('/api/profile/:pid', dimsMongo.getProfileById);

app.listen(5000, () => {
  console.log('http://localhost:5000/api/')
})