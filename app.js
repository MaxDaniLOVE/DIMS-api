const express = require('express');
const bodyParser = require('body-parser');
const profileControlers = require('./controlers/profile-controlers');
const taskControlers = require('./controlers/task-controlers');

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

// ! TASKS
app.post('/api/task/create', taskControlers.createTask);

app.get('/api/tasks', taskControlers.getTasks);

app.get('/api/task/:tid', taskControlers.getTaskById);

app.delete('/api/task/delete/:tid', taskControlers.deleteTaskById);

app.put('/api/task/edit/:tid', taskControlers.editTask);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('http://localhost:5000/api/')
})