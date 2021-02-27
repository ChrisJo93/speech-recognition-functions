const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));

app.get('/test', (req, res) => {
  res.send('You made it champ');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
