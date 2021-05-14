const express = require('express');
const router = express.Router();
const topicController = require('../controller/topicController');
const topicValidation = require('../middlewares/topicValidation');

const {
  topicVal
} = topicValidation;

const {
  createTopic
} = topicController;



router.post('/createtopic', topicVal, createTopic);


module.exports = router;