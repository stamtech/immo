const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const login = require('./routes/login');
const client = require('./routes/client');
const Gestionnaire = require('./routes/gestionnaires');

mongoose.connect('mongodb://localhost:27017/myFonciaBdd', {
  useNewUrlParser: true,
});
const app = express();
const PORT = process.env.PORT || 8888;

app.use(bodyParser.json());

app.use('/login', login);
app.use('/client', client);
app.use('/gestionnaire', Gestionnaire);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({ message: err.message });
    return;
  }
  next();
});
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

module.exports = app;
