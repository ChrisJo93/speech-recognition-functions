// Server construction
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Config for environment variables
require('dotenv').config();

// Json Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// axios import
const { default: axios } = require('axios');

// Serve public folder
app.use(express.static('server/public'));

function getWeather() {
  axios
    .get(
      `api.openweathermap.org/data/2.5/weather?q=Shreveport,USA&appid=${process.env.WEATHERAPI}`
    )
    .then((response) => {
      console.log('no fucking way');
    })
    .catch((error) => {
      console.log('I errroed');
    });
}

// Routes

app.get('/weather', (req, res) => {
  const weather = getWeather();
  res.send(weather);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
