const express = require('express');
const router = express.Router();
const authorValidation = require('../middlewares/authorValidation');
const authController = require('../controller/authController');

const {
  signUp,
  verifyEmail
} = authController;

const {
  createAuthor
} = authorValidation;


router.post('/signUp', createAuthor, signUp);
router.post('/verify', verifyEmail);


module.exports = router;