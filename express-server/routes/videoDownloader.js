const ytdl = require("@distube/ytdl-core");
const slugify = require("slugify");
const { spawn } = require("child_process");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const { isLowerQuality } = require("../lib/utils");

module.exports = async (req, res) => {
  try {
    const id = req.query.id;
    const language = req.query.lang;

    if (!id) return res.json({ error: "Invalid parameters" });

    const url = `https://www.youtube.com/watch?v=${id}`;
    const qualityLabel = req.query.quality;

    if (!url || !ytdl.validateURL(url)) {
      return res.status(400).json({ error: "Invalid YouTube URL  " });
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;

    const formats = info.formats.sort((a, b) => {
      const resDiff = (b.height || 0) - (a.height || 0);
      if (resDiff !== 0) return resDiff;
      return (
        (parseInt(b.contentLength) || 0) - (parseInt(a.contentLength) || 0)
      );
    });

    const safeFilename = slugify(title, { lower: false, strict: true }) || "video-download";

    const completeStream = formats.find(
      (f) =>
        f.hasAudio &&
        f.hasVideo &&
        !f.isLive &&
        (qualityLabel=='lower' ? true : f.qualityLabel == qualityLabel) &&
        f.container == "mp4"
    );

    if (completeStream ) {
      const stream = ytdl.downloadFromInfo(info, {
        format: completeStream,
      });

      res.setHeader("Content-Type", "video/mp4");
      res.setHeader("Content-Length", completeStream.contentLength);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${safeFilename}.mp4"`
      );

      return stream.pipe(res);
    }

    let videoFormats = info.formats
      .filter(
        (f) =>
          f.hasVideo && !f.hasAudio && f.container === "mp4" && f.contentLength
      )
      .sort((a, b) => {
        const resDiff = (b.height || 0) - (a.height || 0);
        if (resDiff !== 0) return resDiff;
        return (
          (parseInt(b.contentLength) || 0) - (parseInt(a.contentLength) || 0)
        );
      });

    let bestVideo;
    if (qualityLabel && qualityLabel != "highest") {
      bestVideo = videoFormats.find((f) => f.qualityLabel == qualityLabel);
    }

    if (!bestVideo) {
      bestVideo = videoFormats[0];
    }

    if (!bestVideo) {
      return res.status(400).json({ error: "No suitable video stream found" });
    }

    const bestAudio = info.formats
      .filter(
        (f) =>
          f.hasAudio && !f.hasVideo && f.container === "mp4" && f.contentLength
      )
      .sort(
        (a, b) =>
          (parseInt(b.contentLength) || 0) - (parseInt(a.contentLength) || 0)
      )[0];

    if (!bestAudio) {
      return res.status(400).json({ error: "No suitable audio stream found" });
    }

    const videoSize = parseInt(bestVideo.contentLength || 0);
    const audioSize = parseInt(bestAudio.contentLength || 0);
    const estimatedSize = videoSize + audioSize;

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeFilename}.mp4"`
    );
    res.setHeader("X-Estimated-Size", estimatedSize);

    const videoStream = ytdl.downloadFromInfo(info, { format: bestVideo });
    const audioStream = ytdl.downloadFromInfo(info, { format: bestAudio });

    const ffmpegProcess = spawn(
      ffmpegInstaller.path,
      [
        "-loglevel",
        "error",
        "-i",
        "pipe:3",
        "-i",
        "pipe:4",
        "-c:v",
        "copy",
        "-c:a",
        "aac",
        "-movflags",
        "frag_keyframe+empty_moov",
        "-f",
        "mp4",
        "pipe:5",
      ],
      {
        stdio: ["inherit", "inherit", "inherit", "pipe", "pipe", "pipe"],
      }
    );

    videoStream.pipe(ffmpegProcess.stdio[3]);
    audioStream.pipe(ffmpegProcess.stdio[4]);
    ffmpegProcess.stdio[5].pipe(res);

    ffmpegProcess.on("close", () => {
      console.log(" Download completed");
    });
  } catch (err) {
    res.status(500).json({ error: "Download failed" });
  }
};
