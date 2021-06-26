const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const authentication = require('../middlewares/authentication');


const {
  createSite,
  createCategory
} = categoryController;


module.exports = router;