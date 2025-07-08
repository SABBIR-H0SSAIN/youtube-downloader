import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import Image from "next/image";

type Props = {
  id: string;
  thumbnail: string;
  className?: string;
};
const streamEndpoint = process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL;
const ThumbnailDownloadCard = ({ id, thumbnail, className }: Props) => {
  console.log(thumbnail);
  return (
    <div
      className={cn(
        "flex flex-col gap-4 max-w-[600px] rounded-md shadow-lg border p-4 bg-card",
        className
      )}
    >
      <div className="relative w-full min-w-[350px] sm:min-w-[450px] aspect-[16/9] shadow-md rounded-md overflow-hidden">
        <Image src={thumbnail} alt="Thumbnail" fill className="object-cover" />
      </div>

      <Button
        className="w-full"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.open(
              `${streamEndpoint}/download/thumbnail?id=${id}`,
              "_self"
            );
          }
        }}
      >
        <Download className="w-4 h-4 cursor-pointer" />
        Download
      </Button>
    </div>
  );
};

export default ThumbnailDownloadCard;
