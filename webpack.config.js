const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js/backend-messages.js",
    "./js/preview.js",
    "./js/gallery-filters.js",
    "./js/gallery.js",
    "./js/upload-size.js",
    "./js/upload-effects.js",
    "./js/validate-hashtag.js",
    "./js/upload-overlay.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  }
};
