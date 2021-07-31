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
  getAllTopic
} = feeController;


router.post('/createfee', verifyToken, createFee);
router.post('/updatefee', verifyToken, updateFee);
router.post('/createtopic', verifyToken, createTopic);
router.post('/updatetopic', verifyToken, updateTopic);
router.post('/createsubtopic', verifyToken, createSubtopic);
router.post('/updatesubTopic', verifyToken, updateSubTopic);
router.post('/removesubtopic', verifyToken, removeSubTopic);
router.post('/removetopic', verifyToken, removeTopic);
router.post('/gettopic', verifyToken, getAllTopic);
router.post('/getsubtopic', verifyToken, getAllSubTopic);

module.exports = router;