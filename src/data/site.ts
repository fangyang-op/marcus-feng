import type { LinkItem } from "./types";
import type { L } from "@/i18n/types";

/**
 * ── 網站主角基本資料 ──────────────────────────────────────────
 * 需要中英切換的欄位寫成 { zh, en }；姓名、Email、連結等專有資訊維持單一字串。
 */
export const siteConfig = {
  name: "馮若陽 Marcus Feng",
  /** 定位標語（中英切換） */
  tagline: {
    zh: "懂系統、讓營運規模化的人",
    en: "Operations leader who understands systems — and scales them",
  } as L,
  /** 職稱 */
  role: {
    zh: "資深營運經理 Senior Operations Manager",
    en: "Senior Operations Manager",
  } as L,
  /** 現職單位 */
  org: { zh: "放洋留遊學", en: "FangYang Global Education" } as L,
  /** 一句話自我介紹 */
  summary: {
    zh: "非工程背景，卻能辨識營運問題並親手建出解決它的系統。從營收成長、團隊管理到 CRM、數據分析與 AI 工具，我把「會用工具」變成「讓營運規模化的系統」。",
    en: "From a non-engineering background, I spot operational problems and build the systems that solve them — myself. From revenue growth and team leadership to CRM, data analytics and AI tooling, I turn “knowing the tools” into “scaling the operation.”",
  } as L,

  /** 正式上線網址（用於 Open Graph / canonical 絕對連結） */
  url: "https://marcus-feng.vercel.app",

  /** ── 聯絡方式 ── */
  email: "marcus.jyfeng@gmail.com",
  linkedin: "https://www.linkedin.com/in/marcus-jyfeng",
  /** 履歷 PDF */
  resumeHref: "/docs/resume.pdf",

  /** ── 頂部導覽錨點 ── */
  nav: [
    { label: { zh: "成果", en: "Impact" }, href: "#metrics" },
    { label: { zh: "專案", en: "Projects" }, href: "#projects" },
    { label: { zh: "知識傳承", en: "Knowledge" }, href: "#knowledge" },
    { label: { zh: "能力", en: "Skills" }, href: "#skills" },
    { label: { zh: "經歷", en: "Experience" }, href: "#timeline" },
    { label: { zh: "聯絡", en: "Contact" }, href: "#contact" },
  ] as LinkItem[],

  /** 頁尾自建宣告（本身就是能力證明，請保留） */
  builtWith: {
    zh: "本站以 Next.js + Tailwind 自建並部署於 Vercel",
    en: "Hand-built with Next.js + Tailwind, deployed on Vercel",
  } as L,
};

/** Hero 區的三顆 CTA */
export const heroCtas: LinkItem[] = [
  { label: { zh: "看作品", en: "See work" }, href: "#projects" },
  {
    label: { zh: "下載履歷", en: "Résumé (PDF)" },
    href: siteConfig.resumeHref,
    external: true,
  },
  { label: { zh: "LinkedIn", en: "LinkedIn" }, href: siteConfig.linkedin, external: true },
];
