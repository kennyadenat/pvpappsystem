const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    req.body.image = req.body.id + '.jpg';
    cb(null, req.body.id + '.jpg');
  }
});

const upload = multer({
  storage: storage
});

const {
  newCategory,
  getCategory,
  updateCategory,
  getOneCategory,
  newSubCategory,
  getOneArticle,
  publishArticle,
  removeArticle,
  removeCategory
} = articleController;


router.post('/newcategory', newCategory);
router.post('/getcategory', getCategory);
router.post('/updatecategory', updateCategory);
router.post('/getonecategory', getOneCategory);
router.post('/newsubcategory', newSubCategory);
router.post('/getonearticle', getOneArticle);
router.post('/publisharticle', upload.single('image'), publishArticle);
router.post('/removearticle', removeArticle);
router.post('/removecategory', removeCategory);

module.exports = router;