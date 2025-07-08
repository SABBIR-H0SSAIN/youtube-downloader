"use client";
import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const streamEndpoint = process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL;

const PlaylistVideoPreviewCard = ({
  id,
  title,
  duration,
  thumbnail,
  info,
}: {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  info: string;
}) => {
  const [mediaType, setMediaType] = useState<"video" | "audio" | "thumbnail">(
    "video"
  );
  const [videoQuality, setVideoQuality] = useState<"highest" | "lower">(
    "highest"
  );

  const handleDownload = () => {
    const params = new URLSearchParams();
    params.set("id", id);
    params.set("quality", videoQuality);

    if (typeof window !== "undefined") {
      if (mediaType === "video") {
        window.open(
          `${streamEndpoint}/download/video?${params.toString()}`,
          "_blank"
        );
      } else if (mediaType === "audio") {
        window.open(
          `${streamEndpoint}/download/audio?${params.toString()}`,
          "_blank"
        );
      } else if (mediaType === "thumbnail") {
        window.open(`${streamEndpoint}/download/thumbnail?id=${id}`, "_self");
      }
    }
  };
  return (
    <div className="flex flex-col justify-between gap-2 max-w-[300px] rounded-md shadow-md border p-4 bg-card">
      <div className="relative">
        <Image
          src={thumbnail}
          alt={title}
          width={336}
          height={188}
          className="rounded-md object-cover border"
        />
        <div className="absolute bottom-2 right-2 bg-gray-900/70 text-white bg-opacity-75 font-bold text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>

      <h3 className="text-lg font-bold line-clamp-3">{title}</h3>

      <p className="text-sm text-gray-500 dark:text-gray-400">{info}</p>

      <div className="flex flex-row gap-2">
        <MediaTypeSelection mediaType={mediaType} setMediaType={setMediaType} />
        <VideoQualitySelection
          videoQuality={videoQuality}
          setVideoQuality={setVideoQuality}
        />
      </div>
      <Button onClick={handleDownload} className="cursor-pointer">
        <Download className="w-4 h-4" />
        <span className="hidden xs:block"> Download </span>
      </Button>
    </div>
  );
};

export default PlaylistVideoPreviewCard;

const MediaTypeSelection = ({
  mediaType,
  setMediaType,
}: {
  mediaType: string;
  setMediaType: any;
}) => {
  return (
    <Select value={mediaType} onValueChange={setMediaType}>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="video">Video</SelectItem>
        <SelectItem value="audio">Audio</SelectItem>
        <SelectItem value="thumbnail">Thumbnail</SelectItem>
      </SelectContent>
    </Select>
  );
};

const VideoQualitySelection = ({
  videoQuality,
  setVideoQuality,
}: {
  videoQuality: string;
  setVideoQuality: any;
}) => {
  return (
    <Select value={videoQuality} onValueChange={setVideoQuality}>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="Select a quality" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="highest">Highest</SelectItem>
        <SelectItem value="lower">Lower</SelectItem>
      </SelectContent>
    </Select>
  );
};
