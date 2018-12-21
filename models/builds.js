const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buildSchema = new Schema(
  {
    appName: {
      type: String,
      required: true,
      maxlength: 50
    },
    url: {
      type: String,
      required: true,
      maxlength: 2083
    },
    splashScreen: {
      type: String,
      required: true,
      maxlength: 30
    },
    launcherIcon: {
      type: String,
      required: true,
      maxlength: 30
    },
    primaryColor: {
      type: String,
      required: true,
      maxlength: 9
    },
    secondaryColor: {
      type: String,
      required: true,
      maxlength: 9
    },
    camera: {
      type: Boolean,
      required: true
    },
    externalUrls: {
      type: Boolean,
      required: true
    },
    gps: {
      type: Boolean,
      required: true
    },
    landscape: {
      type: Boolean,
      required: true
    },
    portrait: {
      type: Boolean,
      required: true
    },
    progressBar: {
      type: Boolean,
      required: true
    },
    ratingDays: {
      type: Number,
      required: true,
      default: 3,
      max: 2000
    },
    ratings: {
      type: Boolean,
      required: true
    },
    uploads: {
      type: Boolean,
      required: true
    },
    zoom: {
      type: Boolean,
      required: true
    },
    orientation: {
      type: String,
      enum: ['portrait', 'landscape', 'unspecified'],
      required: true
    },
    builtApk: {
      type: String
    },
    sourceZip: {
      type: String
    },
    buildError: {
      type: String
    },
    building: {
      type: Boolean,
      default: false
    },
    downloadUrl: String,
    sourceDownloadUrl: String,
    userEmail: String
  },
  { timestamps: true }
);

const Build = mongoose.model('Build', buildSchema);

module.exports = Build;
