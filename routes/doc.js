var express = require('express');
var router = express.Router();
const docController = require('../controller/docController');

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/docs')
  },
  filename: function (req, file, cb) {  
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage
});

const {
  addDocs,
  getDocs
} = docController;


router.post('/adddocs', upload.single('file'), addDocs);
router.post('/getdocs', getDocs);


module.exports = router;