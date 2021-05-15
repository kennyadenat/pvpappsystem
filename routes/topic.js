const express = require('express');
const router = express.Router();
const topicController = require('../controller/topicController');
const topicValidation = require('../middlewares/topicValidation');

const {
  topicVal
} = topicValidation;

const {
  createTopic,
  createSubtopic,
  getTopics,
  updateTopic
} = topicController;



router.post('/createtopic', topicVal, createTopic);
router.post('/gettopic', getTopics);

module.exports = router;