import type { KnowledgeDoc } from "./types";

/**
 * ── 知識傳承區 ────────────────────────────────────────────
 * 「把個人工作變成團隊可繼承的資產」。每份文件 = 一個成果摘要 + 可下載 PDF。
 *
 * PDF 之後放進 /public/docs/，把 pdfHref 改成對應檔名即可（先用 placeholder）。
 */
export const knowledgeDocs: KnowledgeDoc[] = [
  {
    id: "crm-build-log",
    title: { zh: "CRM 建置實錄", en: "CRM Build Log" },
    summary: {
      zh: "從營運痛點到上線系統的完整記錄:需求拆解、資料模型設計、權限制度、版控與字數帳本機制，以及非工程背景如何用 AI 工具把它做出來。",
      en: "A complete record from operational pain points to a live system: requirements breakdown, data model design, permission controls, version control and a word-count ledger mechanism—and how a non-engineer built it all with AI tools.",
    },
    points: [
      {
        zh: "營運問題 → 資料模型 → 權限制度的推導過程",
        en: "The reasoning path from operational problems to data model to permission controls",
      },
      {
        zh: "選校表版控、字數帳本、申請看板的設計決策",
        en: "Design decisions behind school-list versioning, the word-count ledger, and the application board",
      },
      {
        zh: "可交接:讓接手的人看得懂「為什麼這樣設計」",
        en: "Built to hand off: successors can understand the “why” behind every design choice",
      },
    ],
    pdfHref: "/docs/crm-build-log.pdf",
    accent: "crm",
  },
  {
    id: "ai-collab-log",
    title: { zh: "AI 協作開發實錄", en: "AI-Assisted Development Log" },
    summary: {
      zh: "非工程背景如何與 AI（Claude Code）協作，從零把三套內部系統做到上線的方法論:如何拆任務、如何驗收、如何讓 AI 產出可維護的程式碼。",
      en: "A methodology for how a non-engineer collaborates with AI (Claude Code) to take three internal systems from zero to production: how to break down tasks, how to review deliverables, and how to get AI to produce maintainable code.",
    },
    points: [
      {
        zh: "任務拆解與驗收標準:怎麼讓 AI 不亂寫",
        en: "Task breakdown and acceptance criteria: how to keep AI on track",
      },
      {
        zh: "從 Prompt 到可上線:測試、資安、部署的實務",
        en: "From prompt to production: the practical work of testing, security, and deployment",
      },
      {
        zh: "可複製的協作流程，讓團隊也能用 AI 建系統",
        en: "A repeatable collaboration workflow so the team can build systems with AI too",
      },
    ],
    pdfHref: "/docs/ai-collab-log.pdf",
    accent: "nexus",
  },
  {
    id: "security-playbook",
    title: {
      zh: "資安檢測報告書與稽核 Playbook",
      en: "Security Assessment Report & Audit Playbook",
    },
    summary: {
      zh: "自建系統上線前的資安檢測完整報告，加上一份可重複執行的稽核 Playbook，讓「系統安全」從個人經驗變成團隊能照著做的標準流程。",
      en: "A full security assessment conducted before an in-house system goes live, paired with a repeatable audit playbook—turning “system security” from individual know-how into a standard process the team can follow.",
    },
    points: [
      {
        zh: "靜態掃描、相依套件、權限與機敏資料逐項檢查清單",
        en: "Itemized checklists for static analysis, dependencies, permissions, and sensitive data",
      },
      {
        zh: "風險分級與修補建議的撰寫範例",
        en: "Sample write-ups for risk severity ratings and remediation recommendations",
      },
      {
        zh: "可重複執行:換系統也能照表操課",
        en: "Repeatable: the same playbook applies cleanly to any other system",
      },
    ],
    requestOnly: true,
    requestNote: {
      zh: "此份涉及系統防護細節，歡迎於面試中索取。",
      en: "This document covers system defense details—happy to share it during an interview.",
    },
    accent: "matrix",
  },
];
