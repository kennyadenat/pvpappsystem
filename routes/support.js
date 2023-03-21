const express = require('express');
const router = express.Router();
const supportController = require('../controller/supportController');


const {
  newSupport,
  getSubjects,
  getSupportLists,
  readSupportMessage,
  addConversations,
  getGroupList,
  getSubjectSupportLists,
  getSupportByEmail,
  getSupportByTicket
} = supportController;



router.post('/newsupport', newSupport);
router.post('/getsubjects', getSubjects);
router.post('/getsupportlists', getSupportLists);
router.post('/readsupportmessage', readSupportMessage);
router.post('/addconversations', addConversations);
router.post('/getgrouplist', getGroupList);
router.post('/getsubjectsupportlists', getSubjectSupportLists);
router.post('/getsupportbyemail', getSupportByEmail);
router.post('/getsupportbyticket', getSupportByTicket);

module.exports = router;