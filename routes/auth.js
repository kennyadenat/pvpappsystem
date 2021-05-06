const express = require('express');
const router = express.Router();
const authorValidation = require('../middlewares/authorValidation');
const authController = require('../controller/authController');

const {
  signUp,
  signIn,
  verifyEmail
} = authController;

const {
  createAuthor,
  signAuthor
} = authorValidation;


router.post('/signUp', createAuthor, signUp);
router.post('/verify', verifyEmail);
router.post('/signin', signAuthor, signIn);


module.exports = router;