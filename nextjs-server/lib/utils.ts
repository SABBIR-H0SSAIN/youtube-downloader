import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export type YouTubeQualityLabel =
  | "144p"
  | "144p 15fps"
  | "144p60 HDR"
  | "240p"
  | "240p60 HDR"
  | "270p"
  | "360p"
  | "360p60 HDR"
  | "480p"
  | "480p60 HDR"
  | "720p"
  | "720p60"
  | "720p60 HDR"
  | "1080p"
  | "1080p60"
  | "1080p60 HDR"
  | "1440p"
  | "1440p60"
  | "1440p60 HDR"
  | "2160p"
  | "2160p60"
  | "2160p60 HDR"
  | "4320p"
  | "4320p60";

const qualitiesMap: Record<YouTubeQualityLabel, number> = {
  "4320p": 1,
  "4320p60": 2,
  "2160p": 3,
  "2160p60": 4,
  "2160p60 HDR": 5,
  "1440p": 6,
  "1440p60": 7,
  "1440p60 HDR": 8,
  "1080p": 9,
  "1080p60": 10,
  "1080p60 HDR": 11,
  "720p": 12,
  "720p60": 13,
  "720p60 HDR": 14,
  "480p": 15,
  "480p60 HDR": 16,
  "360p": 17,
  "360p60 HDR": 18,
  "270p": 19,
  "240p": 20,
  "240p60 HDR": 21,
  "144p": 22,
  "144p 15fps": 23,
  "144p60 HDR": 24,
};

export const getQualityIndex = (quality: YouTubeQualityLabel): number =>
  qualitiesMap[quality] || 25;


export const sortQuality = (qualities: YouTubeQualityLabel[]) =>
  qualities.sort((a, b) => getQualityIndex(a) - getQualityIndex(b));

export const convertToHumanReadableDuration = (seconds:number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const parts = [];

  if (h > 0) parts.push(`${h} h`);
  if (m > 0) parts.push(`${m} min`);
  if (h === 0 && m === 0) parts.push(`${s} sec`);

  return parts.join(' ');
}

export const convertToYoutubeStyleViewCount = (views:number) => {
  if (views >= 1000000000) return `${(views / 1000000000).toFixed(1)}B`;
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
}

export const extractYouTubeID = (url: string): string | null => {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}