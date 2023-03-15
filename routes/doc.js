var express = require('express');
var router = express.Router();
const docController = require('../controller/docController');
const randomstring = require("randomstring");

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/docs')
  },
  filename: function (req, file, cb) {

    const id = randomstring.generate(9);
    req.body.url = id + '.pdf';
    cb(null, req.body.url);
  }
});

const upload = multer({
  storage: storage
});

const {
  addDocs,
  getDocs,
  getDoc,
  removeDoc,
  getAllDocs
} = docController;


router.post('/adddocs', upload.single('file'), addDocs);
router.post('/getdocs', getDocs);
router.post('/getdoc', getDoc);
router.post('/removedoc', removeDoc);
router.post('/getalldocs', getAllDocs);


module.exports = router;