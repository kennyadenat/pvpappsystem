const express = require('express');
const router = express.Router();
const topicController = require('../controller/topicController');
const topicValidation = require('../middlewares/topicValidation');
const authentication = require('../middlewares/authentication');

const {
  verifyToken
} = authentication;

const {
  topicVal,
  subtopicVal,
  siteVal
} = topicValidation;

const {
  createTopic,
  createSubtopic,
  createSite,
  getTopics,
  getAllSites,
  getAllTopic,
  updateTopic
} = topicController;


router.post('/createtopic', verifyToken, topicVal, createTopic);
router.post('/createsubtopic', verifyToken, subtopicVal, createSubtopic);
router.post('/createsite', siteVal, verifyToken, createSite);
router.post('/gettopic', getTopics);
router.post('/getalltopic', getAllTopic);
router.post('/getallsite', getAllSites);
router.post('/updatetopic', verifyToken, updateTopic);

module.exports = router;