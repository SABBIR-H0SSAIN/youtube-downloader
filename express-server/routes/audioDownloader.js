const ytdl = require("@distube/ytdl-core");
const slugify = require("slugify");
const { spawn } = require("child_process");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const { isLowerQuality } = require("../lib/utils");

module.exports = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.json({ error: "Invalid parameters" });
    const url = `https://www.youtube.com/watch?v=${id}`;

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const safeFilename = slugify(title, { lower: false, strict: true }) || "video-download";

    let bestAudio = info.formats
      .filter(
        (f) => f.hasAudio && !f.hasVideo && f.container === "mp4" && f.contentLength
      )
      .sort(
        (a, b) =>(parseInt(b.contentLength) || 0) - (parseInt(a.contentLength) || 0)
      )[0];

    if (!bestAudio) {
      bestAudio = info.formats
        .filter((f) => f.hasAudio && !f.hasVideo && f.contentLength)
        .sort(
          (a, b) =>
            (parseInt(b.contentLength) || 0) - (parseInt(a.contentLength) || 0)
        )[0];
    }

    if (!bestAudio) {
      return res.status(400).json({ error: "No suitable audio stream found" });
    }

    const ext = bestAudio.container === "mp4" ? "m4a" : bestAudio.container;
    const mime = bestAudio.container === "mp4" ? "audio/mp4" : "audio/webm";

    res.setHeader("Content-Type", mime);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeFilename}.${ext}"`
    );
    res.setHeader("X-Estimated-Size", bestAudio.contentLength);

    const audioStream = ytdl.downloadFromInfo(info, { format: bestAudio });
    audioStream.pipe(res);
    
  } catch (err) {
    res.status(500).json({ error: "Download failed" });
  }
};
