const express = require('express');
const router = express.Router();

const articleValidation = require('../middlewares/articleValidation');
const articleController = require('../controller/articleController');
const authentication = require('../middlewares/authentication');

const {
  verifyToken
} = authentication;

const {
  articleVal,
} = articleValidation;

const {
  createArticle,
  getOneArticle,
  updateArticle,
  getUploads,
  getArticleTopic
} = articleController;

router.post('/createarticle', verifyToken, articleVal, createArticle);
router.post('/updatearticle', verifyToken, updateArticle);
router.post('/onearticle', getOneArticle);
router.post('/getupload', getUploads);
router.post('/searcharticle', getArticleTopic);

module.exports = router;