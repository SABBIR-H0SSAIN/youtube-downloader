"use client";

import { videoDownloadAction } from "@/actions";
import AllToolsPreviewCard from "@/components/AllToolsPreviewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VideoDownloadPreviewCard from "@/components/VideoDownloadPreviewCard";
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
  const [state, action, isLoading] = useActionState<State>(
    videoDownloadAction as any,
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
          <h1 className="text-3xl font-bold text-center">Video Download</h1>
          <p className="text-sm text-muted-foreground text-center pt-1">
            Download your favorite youtube videos just by entering the url.
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
          <p className="text-md text-red-500 text-center">{state?.error}</p>
        )}
        {state?.success && state?.data && (
          <VideoDownloadPreviewCard
            id={state.data.id}
            title={state?.data?.title}
            description={state?.data?.description}
            thumbnail={state?.data?.thumbnail}
            duration={state?.data?.duration}
            views={state?.data?.views}
            formats={state?.data?.formats}
            url={url}
          />
        )}
        <AllToolsPreviewCard />
      </div>
    </div>
  );
};

export default VideoDownloadPage;
