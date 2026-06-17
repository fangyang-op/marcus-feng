import type { LinkItem } from "./types";

/**
 * ── 網站主角基本資料 ──────────────────────────────────────────
 * 這裡集中放姓名、標語、聯絡方式與導覽。改這支檔案 = 改全站的頭尾與 SEO。
 */
export const siteConfig = {
  name: "馮若陽 Marcus Feng",
  /** 定位標語 */
  tagline: "能自己動手建系統的營運人",
  taglineEn: "Operations leader who builds systems",
  /** 職稱 */
  role: "資深營運經理 Senior Operations Manager",
  org: "放洋留遊學",
  /** 一句話自我介紹 */
  summary:
    "非工程背景，卻能辨識營運問題並親手建出解決它的系統。從營收成長、團隊管理到 CRM、數據分析與 AI 工具，我把「會用工具」變成「能交付系統」。",

  /** 正式上線網址(用於 Open Graph / canonical 絕對連結) */
  url: "https://marcus-feng.vercel.app",

  /** ── 聯絡方式 ── */
  email: "marcus.jyfeng@gmail.com",
  linkedin: "https://www.linkedin.com/in/marcus-jyfeng",
  /** 履歷 PDF(放在 /public/docs/resume.pdf，先用 placeholder，替換成真檔即可) */
  resumeHref: "/docs/resume.pdf",

  /** ── 頂部導覽錨點 ── */
  nav: [
    { label: "成果", href: "#metrics" },
    { label: "專案", href: "#projects" },
    { label: "知識傳承", href: "#knowledge" },
    { label: "能力", href: "#skills" },
    { label: "經歷", href: "#timeline" },
    { label: "聯絡", href: "#contact" },
  ] as LinkItem[],

  /** 頁尾自建宣告(本身就是能力證明，請保留) */
  builtWith: "本站以 Next.js + Tailwind 自建並部署於 Vercel",
};

/** Hero 區的三顆 CTA */
export const heroCtas: LinkItem[] = [
  { label: "看作品", href: "#projects" },
  { label: "下載履歷", href: siteConfig.resumeHref, external: true },
  { label: "LinkedIn", href: siteConfig.linkedin, external: true },
];
