const express = require('express');
const bodyParser = require('body-parser');
const dimsMongo = require('./mongo');
const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/create', dimsMongo.createProfile)

app.get('/api/profiles', dimsMongo.getProfiles);

app.delete('/api/profile/delete/:pid', dimsMongo.deleteProfileById);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('http://localhost:5000/api/')
})