const express = require('express');
const router = express.Router();
const multer = require('multer');
const newsController = require('../controller/newsController');
const authentication = require('../middlewares/authentication');

const {
  verifyToken
} = authentication;


const {
  createNews,
  getLandingItems,
  getOnePost,
  getAllNews,
  getPostEdit,
  updateNews,
  updateViews
} = newsController;


router.post('/createnews', verifyToken, multer({
  dest: 'temp/',
  limits: {
    fieldSize: 8 * 1024 * 1024
  }
}).single(
  'header'
), createNews);
router.post('/getnews', getLandingItems);
router.post('/getonenews', getOnePost);
router.post('/updateViews', updateViews);
router.post('/getallnews', getAllNews);
router.post('/geteditnews', verifyToken, getPostEdit);
router.post('/updatenews', verifyToken, multer({
  dest: 'temp/',
  limits: {
    fieldSize: 8 * 1024 * 1024
  }
}).single(
  'header'
), updateNews);

module.exports = router;