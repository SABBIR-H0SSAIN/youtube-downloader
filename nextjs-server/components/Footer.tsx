"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer
      className={`w-full py-4 text-center text-gray-500 dark:text-gray-400 text-sm ${
        pathname === "/" ? "hidden" : ""
      }`}
    >
      &copy; {new Date().getFullYear()} YouTube Downloader. Made with ❤️ by
      Sabbir Hossain
    </footer>
  );
};

export default Footer;
