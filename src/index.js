const express = require('express');
const bodyParser = require('body-parser');
const login = require('./routes/login');
const client = require('./routes/client');

const app = express();
const PORT = process.env.PORT || 8888;

app.use(bodyParser.json());

app.use('/login', login);
app.use('/clients', client);
app.get('/status', (req, res) => {
  const localtime = new Date().toLocaleDateString();
  res.status(200).send(`your server time is ${localtime}`);
});
app.get('*', (req, res) => {
  res.status(404).send('this route does not exist');
});

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
