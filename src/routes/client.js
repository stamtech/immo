const expressJwt = require('express-jwt');
const express = require('express');
const { Client } = require('../models');

const router = express.Router();
const jwtCheck = expressJwt({ secret: process.env.SECRET_KEY });
const isParamsValid = (recordsToSkip, recordsToSend) => recordsToSkip >= 0 && typeof recordsToSkip === 'number' && typeof recordsToSend === 'number';
const getAllClient = async () => Client.find().exec();
const getClientWithPagination = async (recordsToSkip, recordsToSend) => Client.find({}, 'fullname email', {
  skip: recordsToSkip,
  limit: recordsToSend,
}).exec();

router.get('/', jwtCheck, async (req, res) => {
  const clients = await getAllClient().catch((err) => {
    res.status(500).send(err);
  });
  res.send(clients);
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

  const clients = await getClientWithPagination(recordsToSkip, recordsToSend).catch((err) => {
    res.status(500).send(err);
  });

  res.send(clients);
});
module.exports.getAllClient = getAllClient;
module.exports.getClientWithPagination = getClientWithPagination;

module.exports = router;
