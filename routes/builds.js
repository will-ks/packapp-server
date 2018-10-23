// --- Dependencies --- //
const express = require('express');
const router = express.Router();
const validator = require('validator');
const rp = require('request-promise-native');

const Build = require('../models/builds');
const confirmSecret = require('../middlewares/confirmSecret');
const isValidObjectId = require('../middlewares/isValidObjectId');

// --- Routes --- //
router.post('/', (req, res, next) => {
  if (
    !req.body ||
    !validator.isAlphanumeric(req.body.appName) ||
    req.body.appName.length > 50 ||
    !validator.isURL(req.body.url) ||
    req.body.url.length > 2083 ||
    !validator.isAlphanumeric(req.body.splashScreen) ||
    req.body.splashScreen.length > 30 ||
    !validator.isAlphanumeric(req.body.launcherIcon) ||
    req.body.launcherIcon.length > 30 ||
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
    .then(result => {
      return res.json({
        id: result._id
      });
    })
    .catch(next);
});

router.get('/:id', isValidObjectId, (req, res, next) => {
  Build.findById(req.params.id)
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(next);
});

router.put('/:id', isValidObjectId, (req, res, next) => {
  if (req.body.building) {
    const data = {
      building: true,
      builtApk: null
    };
    Build.findByIdAndUpdate(req.params.id, data, { new: true }).then(result => {
      const buildData = result.toObject();
      buildData.callback = `${process.env.SERVER_URL}/builds/result/${
        result._id
      }`;
      buildData._id = result._id.toString();
      rp({
        method: 'POST',
        uri: process.env.BUILD_SERVER_URL,
        body: buildData,
        json: true
      })
        .then(() => {
          return res.status(200).json({ code: 'success' });
        })
        .catch(next);
    });
  }
});

router.put('/result/:id', confirmSecret, isValidObjectId, (req, res, next) => {
  console.log(req.body);
  const data = {
    builtApk: req.body.builtApk,
    buildError: req.body.buildError,
    building: false
  };
  if (data.builtApk) {
    data.downloadUrl = getPublicURL(data.builtApk);
  }
  Build.findByIdAndUpdate(req.params.id, data, { new: true }).catch(err => {
    console.log(err);
  });
  return res.status(200).json({ code: 'success' });
});

router.get('/poll/:id', isValidObjectId, (req, res, next) => {
  Build.findById(req.params.id, {
    builtApk: 1,
    buildError: 1
  })
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(next);
});

// --- Helper functions --- //

function getPublicURL (filename) {
  return `https://storage.googleapis.com/${
    process.env.BUCKET_NAME
  }/${filename}`;
}

module.exports = router;
