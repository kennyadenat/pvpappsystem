const express = require('express');
const router = express.Router();
const multer = require('multer');
const interviewController = require('../controller/interviewController');
const authentication = require('../middlewares/authentication');

const {
  verifyToken
} = authentication;

const {
  getAllInterview,
  createInterview,
  updateInterview,
  getOneInterview,
  getInterviews
} = interviewController;

router.post('/getinterviews', getInterviews);
router.post('/getallinterview', getAllInterview);
router.post('/createinterview', verifyToken, multer({
  dest: 'temp/',
  limits: {
    fieldSize: 8 * 1024 * 1024
  }
}).single(
  'header'
), createInterview);
router.post('/getoneinterview', getOneInterview);
router.post('/updateinterview', verifyToken, multer({
  dest: 'temp/',
  limits: {
    fieldSize: 8 * 1024 * 1024
  }
}).single(
  'header'
), updateInterview);


module.exports = router;