var express = require('express');
var router = express.Router();

/* GET home page. */
const homeRoutes = require('./home');







/* Exports the Respective Routes */
router.use(homeRoutes)




module.exports = router;