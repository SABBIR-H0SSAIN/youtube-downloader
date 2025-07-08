const https = require("https");
const fs = require("fs");

const resolutions = [
  "maxresdefault",
  "sddefault",
  "hqdefault",
  "mqdefault",
  "default",
];

const thumbnailDoownloaderRoute = async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.json({
      message: "Invalid parameters",
    });
  }
  for (let i = 0; i < resolutions.length; i++) {
    const resName = resolutions[i];
    const url = `https://img.youtube.com/vi/${videoId}/${resName}.jpg`;

    const success = await new Promise((resolve) => {
      const request = https.get(url, (ytRes) => {
        if (ytRes.statusCode === 200) {
          res.setHeader(
            "Content-Disposition",
            `attachment; filename="${videoId}.jpg"`
          );
          res.setHeader("Content-Type", "image/jpeg");
          ytRes.pipe(res);
          ytRes.on("end", () => resolve(true));
          ytRes.on("error", () => resolve(false));
        } else {
          ytRes.resume();
          resolve(false);
        }
      });
      request.on("error", () => resolve(false));
    });

    if (success) return; 
   
  }
  if (!res.headersSent) {
    res.status(404).json({
      message: "No thumbnails found",
    });
  }
};

module.exports = thumbnailDoownloaderRoute;
