const express = require('express');
const router = express.Router();

const newsController = require('../controller/newsController');



const {
  createNews
} = newsController;


router.post('/createblog', verifyToken, createNews);

module.exports = router;