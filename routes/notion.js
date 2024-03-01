const express = require("express");
const router = express.Router();
const multer = require("multer");
const notionController = require("../controller/notionController");

const { getNotionUsers } = notionController;

router.post("/getnotionusers", getNotionUsers);

module.exports = router;
