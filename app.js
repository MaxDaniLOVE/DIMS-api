const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const profileControlers = require('./controlers/profile-controlers');
const taskControlers = require('./controlers/task-controlers');
const userTaskControlers = require('./controlers/user-task-controlers');
const tracksControlers = require('./controlers/track-controlers');
const sendMail = require('./smtp/sendMail');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// ! PROFILES
app.post('/api/create', profileControlers.createProfile);

app.get('/api/profiles', profileControlers.getProfiles);

app.get('/api/profile/:pid', profileControlers.getProfileById);

app.delete('/api/profile/delete/:pid', profileControlers.deleteProfileById);

app.put('/api/profile/edit/:pid', profileControlers.editProfile);

app.get('/api/profile/details/:pid', profileControlers.getProfileDetails);

app.get('/api/profile/exists/:email', profileControlers.isProfileExists);

// ! TASKS
app.post('/api/task/create', taskControlers.createTask);

app.get('/api/tasks', taskControlers.getTasks);

app.get('/api/task/:tid', taskControlers.getTaskById);

app.delete('/api/task/delete/:tid', taskControlers.deleteTaskById);

app.put('/api/task/edit', taskControlers.editTask);

// ! USER_TASKS

app.get('/api/user/tasks/:pid', userTaskControlers.getUserTasks);

app.put('/api/user/task', userTaskControlers.setTaskStatus);

app.post('/api/user/task/add/:tid', userTaskControlers.addTaskToUser);

app.get('/api/task/users/:tid', userTaskControlers.getAssignedUsers);

// ! USER_TRACKS

app.post('/api/track/create', tracksControlers.addtUserTrack);

app.get('/api/user/tracks/:pid', tracksControlers.getUserTracks);

app.put('/api/user/tracks', tracksControlers.editTracks);

app.delete('/api/user/tracks/delete/:tid', tracksControlers.deleteTrack);

// ! SEND MAIL
app.get('/api/intouch', sendMail);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('http://localhost:5000/api/')
});

mongoose
  .connect(process.env.API_KEY, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false  })
  .then(() => console.log('connected to db'))
  .catch(() => console.log('connection failed'));
