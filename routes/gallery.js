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
  uploadGallery,
  getCollectibles,
  getImages,
  createVideoGallery,
  getPdfs,
  getVideo
} = galleryController;

router.post('/getcollectibles', getCollectibles);
router.post('/getimages', getImages);
router.post('/getpdf', getPdfs);
router.post('/getvideo', getVideo);
router.post('/createvideo', createVideoGallery);
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