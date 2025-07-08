"use client";

import { playlistDownloadAction } from "@/actions/playlistDownloadAction";
import AllToolsPreviewCard from "@/components/AllToolsPreviewCard";
import PlaylistVideoPreviewCard from "@/components/PlaylistVideoPreviewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Loader2 } from "lucide-react";
import { useActionState, useState } from "react";
type SuccessResponse = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  views: number;
  formats: string[];
};
type State = {
  success: boolean;
  data: SuccessResponse | null;
  error: string | null;
};
const VideoDownloadPage = () => {
  const [url, setUrl] = useState<string>("");
  const [state, action, isLoading] = useActionState<any>(
    playlistDownloadAction as any,
    {
      success: false,
      data: null,
      error: null,
    }
  );
  return (
    <div className="py-6 px-8 max-w-7xl mx-auto ">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-full ">
          <h1 className="text-3xl font-bold text-center">Playlist Download</h1>
          <p className="text-sm text-muted-foreground text-center space-y-2">
            Paste your favorite youtube playlist URL below to start downloading.
          </p>
        </div>
        <form action={action}>
          <div className="flex flex-row gap-1">
            <Input
              name="url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter YouTube URL"
              className="  sm:min-w-md max-w-lg h-11 focus-visible:ring-0 shadow-sm border-[1px] border-gray-300 rounded-md"
            />
            <Button disabled={isLoading} className="h-11" type="submit">
              {isLoading ? (
                <Loader2 strokeWidth={4} className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden xs:block"> Download </span>
            </Button>
          </div>
        </form>
        {state?.error && (
          <p className="text-md w-full text-red-500 text-center">
            {state?.error}
          </p>
        )}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:px-8 pt-4">
          {state.success &&
            state.data &&
            state.data.videos.map((video: any, index: number) => {
              return (
                <PlaylistVideoPreviewCard
                  key={index}
                  id={video.id}
                  title={video.title}
                  duration={video.duration}
                  thumbnail={video.thumbnail}
                  info={video.info}
                />
              );
            })}
        </div>
        <AllToolsPreviewCard />
      </div>
    </div>
  );
};

export default VideoDownloadPage;
