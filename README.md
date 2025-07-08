# YouTube Downloader

A modern, full-stack application for downloading YouTube videos, audio, playlists, and thumbnails.Download streams are performed by Express.js backend, frontend and server action for preview download.

> **Disclaimer:** This project is for personal and educational use only. Please respect YouTube’s Terms of Service and copyright laws when downloading content.

## 🚀 Features

- **Video Download:** Download YouTube videos in multiple formats.
- **Audio Extraction:** Extract and download audio from YouTube videos.
- **Playlist Support:** Download entire YouTube playlists efficiently.
- **Thumbnail Download:** Retrieve and download high quality video thumbnails.
- **User-Friendly Interface:** Clean, responsive UI built with Next.js and Tailwind CSS.
- **Expressjs backend:** Downloads are streamed from expressjs backend for using the full advantage of nodejs


## ❓ Why Express.js Backend Instead of Next.js API Routes?

Express.js is used because it can handle advanced Node.js features like running child processes and efficient streaming, which are required for downloading and processing YouTube content. Next.js API routes have limitations with these operations, making Express.js a better fit for backend tasks in this project.

## App Demo
(_Will be updated soon_)
## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SABBIR-H0SSAIN/youtube-downloader.git
   cd youtube-downloader
   ```

2. **Install dependencies for both servers:**
   ```bash
   cd express-server
   pnpm install
   cd ../nextjs-server
   pnpm install
   ```

## 🏃‍♂️ Running the Application

### Start the Express Backend

```bash
cd express-server
pnpm start
```

### Start the Next.js Frontend

```bash
cd nextjs-server
pnpm dev
```

- The frontend will be available at [http://localhost:3000](http://localhost:3000)
- Expressjs backend will run on port **3001**)

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for any improvements or bug fixes.



## ❤️ Support This Project

If you found this project helpful or interesting, please consider giving it a ⭐️ 

![GitHub Repo stars](https://img.shields.io/github/stars/SABBIR-H0SSAIN/youtube-downloader)


