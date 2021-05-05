const express = require('express');
const router = express.Router();
const authorValidation = require('../middlewares/authorValidation');
const authController = require('../controller/authController');

const {
  signUp
} = authController;

const {
  createAuthor
} = authorValidation;

router.post('/signUp', createAuthor, signUp);


module.exports = router;