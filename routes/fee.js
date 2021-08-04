const express = require('express');
const router = express.Router();

const feeController = require('../controller/feeController');
const authentication = require('../middlewares/authentication');

const {
  verifyToken
} = authentication;

const {
  createFee,
  updateFee,
  createTopic,
  updateTopic,
  createSubtopic,
  updateSubTopic,
  removeSubTopic,
  removeTopic,
  getAllSubTopic,
  getAllTopic,
  getOneFee
} = feeController;


router.post('/createfee', verifyToken, createFee);
router.post('/updatefee', verifyToken, updateFee);
router.post('/getonefee', getOneFee);
router.post('/createtopic', verifyToken, createTopic);
router.post('/updatetopic', verifyToken, updateTopic);
router.post('/createsubtopic', verifyToken, createSubtopic);
router.post('/updatesubtopic', verifyToken, updateSubTopic);
router.post('/removesubtopic', verifyToken, removeSubTopic);
router.post('/removetopic', verifyToken, removeTopic);
router.get('/gettopic', getAllTopic);
router.get('/getsubtopic', getAllSubTopic);

module.exports = router;