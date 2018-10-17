const express = require('express');
const router = express.Router();
const validator = require('validator');

const Build = require('../models/builds');

router.post('/', (req, res, next) => {
  if (
    !req.body.form ||
    !validator.isURL(req.body.form.url) ||
    !validator.isAlphanumeric(req.body.form.url) ||
    !validator.isBase64(req.body.form.splashScreen) ||
    !validator.isBase64(req.body.form.launcherIcon) ||
    !validator.isHexColor(req.body.form.primaryColor) ||
    !validator.isHexColor(req.body.form.secondaryColor) ||
    !validator.isBoolean(req.body.form.camera) ||
    !validator.isBoolean(req.body.form.externalUrls) ||
    !validator.isBoolean(req.body.form.gps) ||
    !validator.isBoolean(req.body.form.landscape) ||
    !validator.isBoolean(req.body.form.portrait) ||
    !validator.isBoolean(req.body.form.progressBar) ||
    !validator.isBoolean(req.body.form.ratingDays) ||
    !validator.isBoolean(req.body.form.uploads) ||
    !validator.isBoolean(req.body.form.zoom) ||
    !validator.isInt(req.body.form.ratingDays)
  ) {
    res.status(422).json({ code: 'incorrect parameters' });
  }
  const data = req.body.form;
  const build = new Build(data);
  build
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(next);
});

module.exports = router;
