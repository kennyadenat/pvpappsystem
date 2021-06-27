var express = require('express');
var router = express.Router();


/* GET home page. */
const homeRoutes = require('./home');
const authRoutes = require('./auth');
const topicRoutes = require('./topic');
const articleRoutes = require('./article');
const categoryRoutes = require('./category');
const newsRoutes = require('./news');




/* Exports the Respective Routes */
router.use(homeRoutes);
router.use('/author', authRoutes);
router.use('/topic', topicRoutes);
router.use('/article', articleRoutes);
router.use('/cat', categoryRoutes);
router.use('/news', newsRoutes)


module.exports = router;