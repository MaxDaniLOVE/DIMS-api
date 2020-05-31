const express = require('express');

const app = express();

app.get('/api/', (req, res) => res.send({"test": "test"}));

app.listen(5000, () => {
  console.log('http://localhost:5000/api/')
})