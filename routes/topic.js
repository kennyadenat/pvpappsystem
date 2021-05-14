const express = require('express');
const router = express.Router();
const topicController = require('../controller/topicController');
const topicValidation = require('../middlewares/topicValidation');


const {
  createTopic
} = topicController;



router.post('/createtopic', createTopic);


module.exports = router;