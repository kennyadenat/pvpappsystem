const express = require('express');
const router = express.Router();
const multer = require('multer');
const postController = require('../controller/postController');


const {
  newPosts,
  publishPosts,
  getPosts
} = postController;


router.post('/newposts', newPosts);
router.post('/publishposts', publishPosts);
router.post('/getposts', getPosts);

module.exports = router;