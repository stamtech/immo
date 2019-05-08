const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();
const users = [
  {
    id: 1,
    username: 'john',
    password: 'myfonciapassword',
  },
  {
    id: 2,
    username: 'guest',
    password: 'guest',
  },
];

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send('you need a username and password');
    return;
  }
  const userFound = users.find(user => user.userName === username || user.password === password);
  if (!userFound) {
    res.status(401).send('User not found !');
    return;
  }

  const token = jwt.sign(
    {
      id: userFound.id,
      username: userFound.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: '3 hours' },
  );

  res.status(200).send({ accesToken: token });
});

module.exports = router;
