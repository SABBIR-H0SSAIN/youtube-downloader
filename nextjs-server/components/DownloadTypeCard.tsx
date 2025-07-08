import { ImageDown, ListVideo, Music, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const DownloadTypeCard = ({
  title,
  type,
  description,
  icon,
  link,
}: {
  title: string;
  type: "video" | "playlist" | "thumbnail" | "audio";
  description: string;
  icon: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div className="flex flex-col items-center justify-between text-center  bg-card gap-4 px-4 py-6 border rounded-lg w-full  sm:max-w-[250px]  shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-200 h-full">
        <Image src={icon} alt="logo" width={70} height={70} />
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground pt-2">{description}</p>
        </div>
        <Button>
          {type === "video" ? (
            <Video className="w-4 h-4" />
          ) : type === "playlist" ? (
            <ListVideo className="w-4 h-4" />
          ) : type === "thumbnail" ? (
            <ImageDown className="w-4 h-4" />
          ) : (
            <Music className="w-4 h-4" />
          )}
          Download {type}
        </Button>
      </div>
    </Link>
  );
};

export default DownloadTypeCard;
