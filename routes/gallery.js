const express = require('express');
const router = express.Router();
const multer = require('multer');
const galleryController = require('../controller/galleryController');
const authentication = require('../middlewares/authentication');

const {
  verifyToken
} = authentication;


const {
  getAllGallery,
  uploadGallery
} = galleryController;

router.post('/getallGallery', getAllGallery);
router.post('/uploadgallery', verifyToken, multer({
  dest: 'temp/',
  limits: {
    fieldSize: 8 * 1024 * 1024
  }
}).single(
  'file'
), uploadGallery);

module.exports = router;