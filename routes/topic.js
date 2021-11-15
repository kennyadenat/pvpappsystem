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
  getOneSite,
  updateTopic,
  removeSubTopic,
  removeTopic
} = topicController;


router.post('/createtopic', verifyToken, topicVal, createTopic);
router.post('/updatetopic', verifyToken, updateTopic);
router.post('/createsubtopic', verifyToken, subtopicVal, createSubtopic);
router.post('/createsite', siteVal, verifyToken, createSite);
router.post('/gettopic', getTopics);
router.post('/getalltopic', getAllTopic);
router.post('/getallsite', getAllSites);
router.post('/getonesite', getOneSite);

router.post('/removetopic', verifyToken, removeTopic);
router.post('/removesubtopic', verifyToken, removeSubTopic);

module.exports = router;