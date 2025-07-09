"use server";

import { getInnertube } from "@/lib/innertube";
import { extractYouTubeID, sortQuality } from "@/lib/utils";

export const videoDownloadAction = async (
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
    const videoInfo = await youtube.getInfo(videoID);

    const formatsData = videoInfo.streaming_data?.adaptive_formats || [];
    console.log(formatsData);
    const formats = sortQuality(
      Array.from(
        new Set(
          formatsData
            .map((format: any) => format.quality_label)
            .filter((quality: any) => quality !== undefined)
        )
      )
    );
    
    const details = {
      id: videoInfo.basic_info.id,
      url: videoInfo.basic_info.url_canonical,
      title: videoInfo.basic_info.title,
      description: videoInfo.basic_info.short_description,
      thumbnail: videoInfo.basic_info.thumbnail?.[0]?.url || "",
      duration: videoInfo.basic_info.duration,
      views: videoInfo.basic_info.view_count,
      formats: formats,
    };

    return {
      success: true,
      data: details,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Invalid video URL",
    };
  }
};
