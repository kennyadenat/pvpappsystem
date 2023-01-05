const express = require('express');
const router = express.Router();
const faqController = require('../controller/faqController');

const {
  newFaqs,
  getFaqs,
  getOneFaqs,
  updateFaq
} = faqController;

router.post('/newfaqs', newFaqs);
router.post('/getfaqs', getFaqs);
router.post('/getonefaqs', getOneFaqs);
router.post('/updatefaqs', updateFaq);


module.exports = router;