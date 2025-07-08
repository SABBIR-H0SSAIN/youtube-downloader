"use server";

import { getInnertube } from "@/lib/innertube";
import { extractYouTubeID } from "@/lib/utils";

export const thumbnailDownloadAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const url = formData.get("url") as string;

    if (!url) {
      return {
        success: false,
        error: "Please enter a valid YouTube video URL",
      };
    }

    const videoID = extractYouTubeID(url);

    if (!videoID) {
      return {
        success: false,
        error: "Please enter a valid YouTube video URL",
      };
    }

    const youtube = await getInnertube();
    const videoInfo = await youtube.getBasicInfo(videoID);

    return {
      success: true,
      data: {
        id: videoInfo.basic_info.id,
        thumbnail: videoInfo.basic_info.thumbnail?.[0]?.url || "",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Invalid video URL",
    };
  }
};
