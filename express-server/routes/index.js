const express = require("express");

const videoDownloaderRoute = require("./videoDownloader");
const audioDownloaderRoute = require("./audioDownloader");
const thumbnailDoownloaderRoute = require("./thumbnailDownloader");

const router = express.Router();

router.get("/video", videoDownloaderRoute);
router.get("/audio", audioDownloaderRoute);
router.get("/thumbnail", thumbnailDoownloaderRoute);

module.exports = router;
