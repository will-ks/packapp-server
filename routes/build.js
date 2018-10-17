const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Build = require('../models/builds');

router.post('/', (req, res, next) => {
  if (!req.body.form) {
    res.status(422).json({ code: 'incorrect parameters' });
  }

  res.send('hello world');
});

module.exports = router;
