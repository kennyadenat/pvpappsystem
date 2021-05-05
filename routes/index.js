var express = require('express');
var router = express.Router();


/* GET home page. */
const homeRoutes = require('./home');
const authRoutes = require('./auth');










/* Exports the Respective Routes */
router.use(homeRoutes);
router.use('/author', authRoutes);



module.exports = router;