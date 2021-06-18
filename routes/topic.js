const express = require('express');
const router = express.Router();
const topicController = require('../controller/topicController');
const topicValidation = require('../middlewares/topicValidation');
const authentication = require('../middlewares/authentication');

const {
  verifyToken
} = authentication;

const {
  topicVal
} = topicValidation;

const {
  createTopic,
  createSubtopic,
  getTopics,
  updateTopic
} = topicController;


router.post('/createtopic', verifyToken, topicVal, createTopic);
router.post('/gettopic', getTopics);
router.post('/updatetopic', verifyToken, updateTopic);

module.exports = router;