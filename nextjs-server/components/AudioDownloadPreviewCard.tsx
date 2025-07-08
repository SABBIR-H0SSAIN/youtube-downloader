"use client";
import { Clock8, Download, Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  cn,
  convertToHumanReadableDuration,
  convertToYoutubeStyleViewCount,
} from "../lib/utils";
import { Button } from "./ui/button";

type Props = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  views: number;
  className?: string;
  formats: string[];
  url?: string;
};
const streamEndpoint = process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL;
const AudioDownloadPreviewCard = ({
  id,
  title,
  description,
  thumbnail,
  duration,
  views,
  className = "",
  formats,
  url,
}: Props) => {
  const [quality, setQuality] = useState(formats[0]);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("id", id as string);

    const endpointUrl = `${streamEndpoint}/download/audio?${params.toString()}`;

    if (typeof window !== "undefined") {
      window.open(endpointUrl, "_blank");
    }
  };
  return (
    <div
      className={cn(
        "flex flex-col bg-white gap-2 max-w-sm sm:max-w-[600px]  p-5 rounded-lg shadow-md border bg-card",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row gap-2 items-center ">
        <Image
          src={thumbnail}
          alt={title}
          height={100}
          width={100}
          loading="lazy"
          onClick={() => {
            if (url) router.push(url);
          }}
          className="border max-sm:w-full max-sm:h-auto  rounded-lg min-w-[200px] object-cover"
        />
        <div className="flex flex-col gap-1 ">
          <h3 className="text-lg font-bold line-clamp-2 ">{title}</h3>
          <p className="text-sm text-gray-500 line-clamp-3 break-words">
            {description}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <span className="inline-flex text-sm text-gray-500 dark:text-gray-400 items-center gap-1">
          <Clock8 className="w-4 h-4" />{" "}
          {convertToHumanReadableDuration(duration)}{" "}
        </span>
        <span className="inline-flex text-sm text-gray-500 dark:text-gray-400 items-center gap-1">
          <Eye className="w-4 h-4" />
          {convertToYoutubeStyleViewCount(views)} views
        </span>
      </div>
      <div className="flex flex-row items-center justify-center pt-3 gap-2">
        <Button onClick={handleSubmit} className="w-full flex-1 cursor-pointer">
          <Download className="w-4 h-4" />
          Download Audio
        </Button>
      </div>
    </div>
  );
};

export default AudioDownloadPreviewCard;
