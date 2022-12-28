var express = require('express');
var router = express.Router();


/* GET home page. */
const homeRoutes = require('./home');
const postRoutes = require('./posts');


/* Exports the Respective Routes */
router.use(homeRoutes);
router.use('/post', postRoutes);


module.exports = router;