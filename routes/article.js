const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');


const {
  newCategory,
  getCategory,
  updateCategory,
  getOneCategory
} = articleController;


router.post('/newcategory', newCategory);
router.post('/getcategory', getCategory);
router.post('/updatecategory', updateCategory);
router.post('/getonecategory', getOneCategory);


module.exports = router;