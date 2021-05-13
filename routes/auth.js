const express = require('express');
const router = express.Router();
const authorValidation = require('../middlewares/authorValidation');
const authController = require('../controller/authController');

const {
  signUp,
  signIn,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPasword
} = authController;

const {
  createAuthor,
  signAuthor,
  validateEmail
} = authorValidation;


router.post('/signUp', createAuthor, signUp);
router.post('/verify', verifyEmail);
router.post('/signin', signAuthor, signIn);
router.post('/forgot', forgotPassword);
router.post('/reset', resetPasword);


module.exports = router;