import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 此機器上層目錄另有 lockfile,明確指定本專案為輸出追蹤根目錄,避免 Next 推斷錯誤(也讓 Vercel 部署乾淨)。
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
