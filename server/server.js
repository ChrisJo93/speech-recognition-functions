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

// Serve public folder
app.use(express.static('server/public'));

// Routes
app.get('/test', (req, res) => {
  res.send('success. Time to build api call');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
