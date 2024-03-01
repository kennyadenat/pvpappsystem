var express = require("express");
var router = express.Router();

/* GET home page. */
const homeRoutes = require("./home");
const postRoutes = require("./posts");
const faqRoutes = require("./faq");
const articleRoutes = require("./article");
const docRoutes = require("./doc");
const supportRoutes = require("./support");
const notionRoutes = require("./notion");

/* Exports the Respective Routes */
router.use(homeRoutes);
router.use("/post", postRoutes);
router.use("/faq", faqRoutes);
router.use("/article", articleRoutes);
router.use("/doc", docRoutes);
router.use("/support", supportRoutes);
router.use("/notion", notionRoutes);

module.exports = router;
