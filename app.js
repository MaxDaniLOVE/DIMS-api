const express = require('express');

const app = express();

app.get('/', (req, res) => res.send({"test": "test"}));

app.listen(5000, () => {
  console.log('http://localhost:5000/')
})