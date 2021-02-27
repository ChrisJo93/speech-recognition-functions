// Server construction
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Config for environment variables
require('dotenv').config();

// Json Middleware
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// axios import
const axios = require('axios');

// Serve public folder
app.use(express.static('server/public'));

// Routes
app.get('/test', (req, res) => {
  res.send('success. Time to build api call');
});

let weather = {};

app.get('weather', (req, res) => {
  axios
    .get('')
    .then((response) => {
      let weather = response.data;
      res.send(weather);
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(weather);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
