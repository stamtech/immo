const expressJwt = require('express-jwt');
const express = require('express');

const router = express.Router();
const jwtCheck = expressJwt({ secret: process.env.SECRET_KEY });

router.get('/', jwtCheck, (req, res) => {
  res.status(200).send('you have special access if you can see this ! ');
});

module.exports = router;
