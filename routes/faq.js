const express = require('express');
const router = express.Router();
const faqController = require('../controller/faqController');

const {
  addFaq,
  getFaq
} = faqController;

router.post('/addfaq', addFaq);
router.post('/getfaq', getFaq);

module.exports = router;