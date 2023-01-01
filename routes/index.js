var express = require('express');
var router = express.Router();


/* GET home page. */
const homeRoutes = require('./home');
const postRoutes = require('./posts');
const faqRoutes = require('./faq');


/* Exports the Respective Routes */
router.use(homeRoutes);
router.use('/post', postRoutes);
router.use('/faq', faqRoutes);



module.exports = router;