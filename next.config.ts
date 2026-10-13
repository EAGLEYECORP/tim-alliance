import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds plain HTML/CSS/JS into `out/` for any static host (cPanel, FTP, Nginx, Apache).
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = staticExport
  ? { output: "export", trailingSlash: true }
  : { output: "standalone" };

export default nextConfig;
