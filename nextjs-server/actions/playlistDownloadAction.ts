"use server";

import Innertube from "youtubei.js";

export const playlistDownloadAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const url = formData.get("url") as string;

    if (!url) {
      return {
        success: false,
        error: "Please enter a valid youtube playlist URL",
      };
    }
    const parsedUrl = new URL(url);
    const playlistId = parsedUrl.searchParams.get("list");

    if (!playlistId) {
      return {
        success: false,
        error: "Please enter a valid youtube playlist  URL",
      };
    }

    const youtube = await Innertube.create();
    const playlist = await youtube.getPlaylist(playlistId);
    if (!playlist) {
      return {
        success: false,
        error: "Playlist not found",
      };
    }
    console.log(playlist.videos[0]);
    const videos = playlist.videos.map((video: any) => {
      return {
        id: video.id,
        title: video.title.text,
        duration: video.duration.text,
        thumbnail: video.thumbnails[0].url,
        info: video.video_info.text,
      };
    });
    console.log(videos);
    console.log("has video", playlist.videos.length, playlist.has_continuation);
    return {
      success: true,
      data: {
        title: playlist.info.title,
        totalVideos: playlist.info.total_items,
        videos: videos,
        hasContinuation: playlist.has_continuation,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Invalid youtube playlist URL",
    };
  }
};
