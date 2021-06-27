const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const authentication = require('../middlewares/authentication');
const topicValidation = require('../middlewares/topicValidation');

const {
  verifyToken
} = authentication;

const {
  topicVal,
  siteVal
} = topicValidation;

const {
  createSite,
  createCategory,
  getAllSites,
  getOneSite
} = categoryController;

router.post('/createsite', siteVal, verifyToken, createSite);
router.post('/createcategory', verifyToken, topicVal, createCategory);
router.post('/getallsite', getAllSites);
router.post('/getonesite', getOneSite);


module.exports = router;