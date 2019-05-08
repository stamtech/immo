const expressJwt = require('express-jwt');
const express = require('express');
const { Client } = require('../models');

const router = express.Router();
const jwtCheck = expressJwt({ secret: process.env.SECRET_KEY });
const isParamsValid = (recordsToSkip, recordsToSend) => recordsToSkip >= 0 && typeof recordsToSkip === 'number' && typeof recordsToSend === 'number';
router.get('/', jwtCheck, async (req, res) => {
  const response = await Client.find()
    .exec()
    .catch((err) => {
      res.status(500).send(err);
    });

  res.send(response);
});

router.get('/records/:numberOfRecords/page/:pageNumber', jwtCheck, async (req, res) => {
  const { numberOfRecords, pageNumber } = req.params;
  const recordsToSkip = numberOfRecords * (pageNumber - 1);
  const recordsToSend = parseInt(numberOfRecords, 10);

  if (!isParamsValid(recordsToSkip, recordsToSend)) {
    res.status(400).send('bad parameters');
    return;
  }
  if (recordsToSend === 0) res.status(200).send([]);

  const response = await Client.find({}, 'fullname email', {
    skip: recordsToSkip,
    limit: recordsToSend,
  })
    .exec()
    .catch((err) => {
      res.status(500).send(err);
    });

  res.send(response);
});

module.exports = router;
