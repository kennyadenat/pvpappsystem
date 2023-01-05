var express = require('express');
var router = express.Router();


/* GET home page. */
const homeRoutes = require('./home');
const postRoutes = require('./posts');
const faqRoutes = require('./faq');
const articleRoutes = require('./article');

/* Exports the Respective Routes */
router.use(homeRoutes);
router.use('/post', postRoutes);
router.use('/faq', faqRoutes);
router.use('/article', articleRoutes);


module.exports = router;