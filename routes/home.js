const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'NASC PVP APPLICATIONs'
  });
});

module.exports = router;