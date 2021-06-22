const express = require('express');
const router = express.Router();

const articleValidation = require('../middlewares/articleValidation');
const articleController = require('../controller/articleController');
const authentication = require('../middlewares/authentication');

const {
  verifyToken
} = authentication;

const {
  articleVal
} = articleValidation;

const {
  createArticle
} = articleController;

router.post('/createarticle', verifyToken, articleVal, createArticle);


module.exports = router;