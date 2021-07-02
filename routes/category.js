const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const authentication = require('../middlewares/authentication');
const topicValidation = require('../middlewares/topicValidation');

const {
  verifyToken
} = authentication;

const {
  siteVal,
  catVal
} = topicValidation;

const {
  createSite,
  createCategory,
  getAllSites,
  getOneSite,
  getAllCategory,
  getOneCat
} = categoryController;

router.post('/createsite', siteVal, verifyToken, createSite);
router.post('/createtopic', catVal, verifyToken, createCategory);
router.post('/getallsite', getAllSites);
router.post('/getallcat', getAllCategory);
router.post('/getonesite', getOneSite);
router.post('/getonecat', getOneCat);


module.exports = router;