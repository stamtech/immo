const expressJwt = require('express-jwt');
const express = require('express');
const { Gestionnaire } = require('../models');

const router = express.Router();
const jwtCheck = expressJwt({ secret: process.env.SECRET_KEY });
const getAllGestionnaires = async () => Gestionnaire.find().exec();

router.get('/', jwtCheck, async (req, res) => {
  const gestionnaires = await getAllGestionnaires().catch((err) => {
    res.status(500).send(err);
  });
  console.log(gestionnaires);
  res.send(gestionnaires);
});

module.exports = router;
