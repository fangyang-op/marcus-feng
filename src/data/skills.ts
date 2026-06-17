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
    title: { zh: "建置與部署", en: "Build & Deployment" },
    items: [
      { zh: "Claude Code", en: "Claude Code" },
      { zh: "Next.js", en: "Next.js" },
      { zh: "React", en: "React" },
      { zh: "TypeScript", en: "TypeScript" },
      { zh: "Tailwind CSS", en: "Tailwind CSS" },
      { zh: "Vercel", en: "Vercel" },
    ],
  },
  {
    title: { zh: "資料與後端", en: "Data & Backend" },
    items: [
      { zh: "Supabase", en: "Supabase" },
      { zh: "Firebase", en: "Firebase" },
      { zh: "PostgreSQL", en: "PostgreSQL" },
      { zh: "SQL", en: "SQL" },
      { zh: "Google Apps Script", en: "Google Apps Script" },
    ],
  },
  {
    title: { zh: "數據與 AI", en: "Data & AI" },
    items: [
      { zh: "Recharts", en: "Recharts" },
      { zh: "Gemini API", en: "Gemini API" },
      { zh: "Claude API", en: "Claude API" },
      { zh: "資料建模", en: "Data Modeling" },
      { zh: "資料視覺化", en: "Data Visualization" },
    ],
  },
  {
    title: { zh: "品質與資安", en: "Quality & Security" },
    items: [
      { zh: "Semgrep", en: "Semgrep" },
      { zh: "SonarQube", en: "SonarQube" },
      { zh: "Playwright", en: "Playwright" },
      { zh: "Git", en: "Git" },
      { zh: "資安稽核", en: "Security Auditing" },
    ],
  },
];

/** 營運能力 */
export const operations: SkillGroup[] = [
  {
    title: { zh: "流程與系統", en: "Process & Systems" },
    items: [
      { zh: "流程設計 (SOP)", en: "Process Design (SOP)" },
      { zh: "Customer Journey Map", en: "Customer Journey Map" },
      { zh: "系統需求拆解", en: "System Requirements Breakdown" },
      { zh: "資料治理", en: "Data Governance" },
    ],
  },
  {
    title: { zh: "團隊與成長", en: "Team & Growth" },
    items: [
      { zh: "團隊指導", en: "Team Coaching" },
      { zh: "績效制度設計", en: "Performance System Design" },
      { zh: "跨部門協作", en: "Cross-Functional Collaboration" },
      { zh: "知識傳承", en: "Knowledge Transfer" },
    ],
  },
  {
    title: { zh: "市場與品牌", en: "Market & Brand" },
    items: [
      { zh: "品牌重塑", en: "Brand Repositioning" },
      { zh: "B2B 業務開發", en: "B2B Business Development" },
      { zh: "營收成長策略", en: "Revenue Growth Strategy" },
      { zh: "定價設計", en: "Pricing Design" },
    ],
  },
];
