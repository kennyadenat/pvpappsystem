const express = require("express");
const router = express.Router();
const multer = require("multer");
const postController = require("../controller/postController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    req.body.image = req.body.id + ".jpg";
    cb(null, req.body.id + ".jpg");
  },
});

const upload = multer({
  storage: storage,
});

const {
  newPosts,
  publishPosts,
  getPosts,
  getOnePosts,
  removePost,
  getAllPosts,
  getOneSlug,
  uploadBackgroundImage,
  addPostImage,
  extractUrl,
} = postController;

router.post("/newposts", newPosts);
router.post("/publishposts", upload.single("image"), publishPosts);
router.post("/getposts", getPosts);
router.post("/getallposts", getAllPosts);
router.post("/getoneposts", getOnePosts);
router.post("/getoneslug", getOneSlug);
router.post("/removepost", removePost);
router.post(
  "/uploadbackgroundimage",
  upload.single("image"),
  uploadBackgroundImage
);
router.post("/addpostimage", upload.single("image"), addPostImage);
router.post("/extracturl", extractUrl);

module.exports = router;
