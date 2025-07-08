import Image from "next/image";
import Link from "next/link";

const tools = [
  {
    href: "video",
    title: "Video Download",
    description: "Download YouTube videos in high quality.",
    icon: "/youtube-2.png",
  },
  {
    href: "audio",
    title: "Audio Download",
    description: "Extract and download audio from YouTube videos.",
    icon: "/mp3.png",
  },
  {
    href: "playlist",
    title: "Playlist Download",
    description: "Download entire YouTube playlists with one click.",
    icon: "/playlist.png",
  },
  {
    href: "thumbnail",
    title: "Thumbnail Download",
    description: "Download high-resolution video thumbnails.",
    icon: "/thumbnail.png",
  },
];

const AllToolsPreviewCard = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-40 ">
      {tools.map((tool, index) => (
        <Link href={`/${tool.href}`} key={index}>
          <div className="flex  flex-col items-center h-full p-4 bg-card rounded-lg border shadow hover:shadow-lg dark:hover:scale-103 transition duration-150 cursor-pointer">
            <Image
              src={tool.icon}
              alt={tool.title}
              width={40}
              height={40}
              className="mb-2"
            />
            <h3 className="text-base font-semibold mb-1 text-center">
              {tool.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400  text-xs text-center">
              {tool.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllToolsPreviewCard;
