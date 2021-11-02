const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');
const authentication = require('../middlewares/authentication');

const {
  verifyToken
} = authentication;

const {
  getContacts,
  addContact,
  destroyContact
} = contactController;


router.post('/addcontact', addContact);
router.post('/getcontacts', verifyToken, getContacts);
router.post('/destroycontact', verifyToken, destroyContact);


module.exports = router;