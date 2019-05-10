const expressJwt = require('express-jwt');
const express = require('express');
const { Gestionnaire } = require('../models');

const router = express.Router();
const jwtCheck = expressJwt({ secret: process.env.SECRET_KEY });
const getAllGestionnaires = async () => Gestionnaire.find().lean();
const isLeaf = node => node.l === null && node.r === null;

let allCombinaisons;
const parcoursArbre = (combinaisons, node) => {
  if (node === null) return;
  if (isLeaf(node)) {
    allCombinaisons.push(combinaisons.concat(node.x));
  }
  parcoursArbre(combinaisons.concat(node.x), node.l);
  parcoursArbre(combinaisons.concat(node.x), node.r);
};

router.get('/', jwtCheck, async (req, res) => {
  const gestionnaires = await getAllGestionnaires().catch((err) => {
    res.status(500).send(err);
  });
  const gestionnairesWithCombinaisons = gestionnaires.map((gestionnaire) => {
    allCombinaisons = [];
    parcoursArbre('', gestionnaire.numeros);
    return {
      fullname: gestionnaire.fullname,
      combinaisons: allCombinaisons,
    };
  });
  res.status(200).send(gestionnairesWithCombinaisons);
});
module.exports = router;
