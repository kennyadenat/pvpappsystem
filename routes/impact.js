const express = require('express');
const router = express.Router();
const multer = require('multer');
const impactController = require('../controller/impactController');
const authentication = require('../middlewares/authentication');

const {
  verifyToken
} = authentication;

const {
  getAllImpact,
  createImpact,
  updateImpact,
  getOneImpact
} = impactController;


router.post('/getallimpact', getAllImpact);
router.post('/createimpact', verifyToken, multer({
  dest: 'temp/',
  limits: {
    fieldSize: 8 * 1024 * 1024
  }
}).single(
  'header'
), createImpact);
router.post('/getoneimpact', getOneImpact);
router.post('/updateimpact', verifyToken, multer({
  dest: 'temp/',
  limits: {
    fieldSize: 8 * 1024 * 1024
  }
}).single(
  'header'
), updateImpact);


module.exports = router;