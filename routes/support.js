const express = require('express');
const router = express.Router();
const supportController = require('../controller/supportController');


const {
  newSupport,
  getSubjects,
  getSupportLists,
  readSupportMessage
} = supportController;


router.post('/newsupport', newSupport);
router.post('/getsubjects', getSubjects);
router.post('/getsupportlists', getSupportLists);
router.post('/readsupportmessage', readSupportMessage);



module.exports = router;