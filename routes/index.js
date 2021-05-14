var express = require('express');
var router = express.Router();


/* GET home page. */
const homeRoutes = require('./home');
const authRoutes = require('./auth');
const topicRoutes = require('./topic');









/* Exports the Respective Routes */
router.use(homeRoutes);
router.use('/author', authRoutes);
router.use('/topic', topicRoutes);


module.exports = router;