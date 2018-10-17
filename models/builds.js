const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const buildSchema = new Schema({
  appName: String,
  url: String,
  splashScreen: String,
  launcherIcon: String,
  primaryColor: String,
  secondaryColor: String,
  camera: Boolean,
  externalUrls: Boolean,
  gps: Boolean,
  landscape: Boolean,
  portrait: Boolean,
  progressBar: Boolean,
  ratingDays: {
    type: Number,
    default: 3
  },
  ratings: Boolean,
  uploads: Boolean,
  zoom: Boolean
});

const Item = mongoose.model('Build', buildSchema);

module.exports = Item;
