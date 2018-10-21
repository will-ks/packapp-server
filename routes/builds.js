const express = require('express');
const router = express.Router();
const validator = require('validator');

const Build = require('../models/builds');

router.post('/', (req, res, next) => {
  console.log(req.body);
  if (
    !req.body ||
    !validator.isAlphanumeric(req.body.appName) ||
    !validator.isURL(req.body.url) ||
    !validator.isAlphanumeric(req.body.splashScreen) ||
    !validator.isAlphanumeric(req.body.launcherIcon) ||
    !validator.isHexColor(req.body.primaryColor) ||
    !validator.isHexColor(req.body.secondaryColor) ||
    typeof req.body.camera !== 'boolean' ||
    typeof req.body.camera !== 'boolean' ||
    typeof req.body.externalUrls !== 'boolean' ||
    typeof req.body.gps !== 'boolean' ||
    typeof req.body.landscape !== 'boolean' ||
    typeof req.body.portrait !== 'boolean' ||
    typeof req.body.progressBar !== 'boolean' ||
    typeof req.body.ratings !== 'boolean' ||
    typeof req.body.uploads !== 'boolean' ||
    typeof req.body.zoom !== 'boolean' ||
    typeof req.body.ratingDays !== 'number'
  ) {
    return res.status(422).json({ code: 'incorrect parameters' });
  }
  const data = req.body;
  if (data.portrait && data.landscape) {
    data.orientation = 'unspecified';
  } else if (data.portrait) {
    data.orientation = 'portrait';
  } else {
    data.orientation = 'landscape';
  }
  const build = new Build(data);
  build
    .save()
    .then(() => {
      return res.json({});
    })
    .catch(next);
});

module.exports = router;
