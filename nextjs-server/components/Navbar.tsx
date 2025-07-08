import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
const links = [
  {
    label: "Video",
    href: "/video",
  },
  {
    label: "Playlist",
    href: "/playlist",
  },
  {
    label: "Audio",
    href: "/audio",
  },
  {
    label: "Thumbnail",
    href: "/thumbnail",
  },
];
const Navbar = () => {
  return (
    <nav className="sticky h-16 top-0 left-0 right-0 z-50 w-full flex items-center bg-gray-300/70 dark:bg-dark-3/80 justify-between px-4 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <Image src="/logo.png" alt="logo" width={32} height={32} />

        <h1 className="text-2xl font-bold">
          <span className="">YourTube</span>
        </h1>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className=" font-medium hover:text-primary  transition-all duration-200"
          >
            {link.label} <span className="block lg:inline">Download</span>
          </Link>
        ))}
      </div>
      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
