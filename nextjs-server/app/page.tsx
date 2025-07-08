import DownloadTypeCard from "@/components/DownloadTypeCard";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800">
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left px-4 md:px-12 lg:px-24 py-5 md:py-12 gap-8 md:gap-16">
        <div className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-1/2">
          <Image
            src="/hero-image.svg"
            alt="YouTube Downloader"
            width={500}
            height={500}
            className="mb-6 md:mb-0 drop-shadow-xl"
            priority
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text mb-4">
            Download YouTube Videos, Playlists, Audio & Thumbnails
          </h1>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
            The fastest, easiest, and most reliable way to download your
            favorite YouTube content. No ads. No hassle. 100% free.
          </p>
          <a
            href="#tools"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      <section id="tools" className="py-8 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200">
          Choose Your Download Type
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <DownloadTypeCard
              title="Video Download"
              type="video"
              description="Download your favorite videos from YouTube in just a click."
              icon="/youtube-2.png"
              link="/video"
            />
            <DownloadTypeCard
              title="Playlist Download"
              type="playlist"
              description="Download your favorite playlists by entering the url."
              icon="/playlist.png"
              link="/playlist"
            />
            <DownloadTypeCard
              title="Audio Download"
              type="audio"
              description="Extract high-quality audio from any YouTube video."
              icon="/mp3.png"
              link="/audio"
            />
            <DownloadTypeCard
              title="Thumbnail Download"
              type="thumbnail"
              description="Download high quality thumbnails from any YouTube video."
              icon="/thumbnail.png"
              link="/thumbnail"
            />
          </div>
        </div>
      </section>
      <footer className={`w-full py-4 text-center text-gray-500 dark:text-gray-400 text-sm `}>
      &copy; {new Date().getFullYear()} YouTube Downloader. Made with ❤️ by
      Sabbir Hossain
    </footer>
    </div>
  );
}
