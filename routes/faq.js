const express = require('express');
const router = express.Router();
const faqController = require('../controller/faqController');
const authentication = require('../middlewares/authentication');

const {
  verifyToken
} = authentication;

const {
  addFaq,
  getFaq,
  createSite,
  getAllSites,
  getSiteFaq
} = faqController;


router.post('/addfaq', verifyToken, addFaq);
router.post('/getfaq', getFaq);
router.post('/getallsite', getAllSites);
router.post('/createsite', verifyToken, createSite);
router.post('/getsitefaq', getSiteFaq);

module.exports = router;