import type { SkillGroup } from "./types";

/**
 * ── 能力與技術 ────────────────────────────────────────────
 * 左半:工具鏈（我實際用來建系統的技術）
 * 右半:營運能力（我作為營運人的核心職能）
 * 直接增刪字串即可。
 */

/** 工具鏈 */
export const toolchain: SkillGroup[] = [
  {
    title: "建置與部署",
    items: ["Claude Code", "Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    title: "資料與後端",
    items: ["Supabase", "Firebase", "PostgreSQL", "SQL", "Google Apps Script"],
  },
  {
    title: "數據與 AI",
    items: ["Recharts", "Gemini API", "Claude API", "資料建模", "資料視覺化"],
  },
  {
    title: "品質與資安",
    items: ["Semgrep", "SonarQube", "Playwright", "Git", "資安稽核"],
  },
];

/** 營運能力 */
export const operations: SkillGroup[] = [
  {
    title: "流程與系統",
    items: ["流程設計 (SOP)", "Customer Journey Map", "系統需求拆解", "資料治理"],
  },
  {
    title: "團隊與成長",
    items: ["團隊指導", "績效制度設計", "跨部門協作", "知識傳承"],
  },
  {
    title: "市場與品牌",
    items: ["品牌重塑", "B2B 業務開發", "營收成長策略", "定價設計"],
  },
];
