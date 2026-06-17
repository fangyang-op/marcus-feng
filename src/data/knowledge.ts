import type { KnowledgeDoc } from "./types";

/**
 * ── 知識傳承區 ────────────────────────────────────────────
 * 「把個人工作變成團隊可繼承的資產」。每份文件 = 一個成果摘要 + 可下載 PDF。
 *
 * PDF 之後放進 /public/docs/,把 pdfHref 改成對應檔名即可(先用 placeholder)。
 */
export const knowledgeDocs: KnowledgeDoc[] = [
  {
    id: "crm-build-log",
    title: "CRM 建置實錄",
    summary:
      "從營運痛點到上線系統的完整記錄:需求拆解、資料模型設計、權限制度、版控與字數帳本機制,以及非工程背景如何用 AI 工具把它做出來。",
    points: [
      "營運問題 → 資料模型 → 權限制度的推導過程",
      "選校表版控、字數帳本、申請看板的設計決策",
      "可交接:讓接手的人看得懂「為什麼這樣設計」",
    ],
    pdfHref: "/docs/crm-build-log.pdf",
    accent: "crm",
  },
  {
    id: "ai-collab-log",
    title: "AI 協作開發實錄",
    summary:
      "非工程背景如何與 AI(Claude Code)協作,從零把三套內部系統做到上線的方法論:如何拆任務、如何驗收、如何讓 AI 產出可維護的程式碼。",
    points: [
      "任務拆解與驗收標準:怎麼讓 AI 不亂寫",
      "從 Prompt 到可上線:測試、資安、部署的實務",
      "可複製的協作流程,讓團隊也能用 AI 建系統",
    ],
    pdfHref: "/docs/ai-collab-log.pdf",
    accent: "nexus",
  },
  {
    id: "security-playbook",
    title: "資安檢測報告書與稽核 Playbook",
    summary:
      "自建系統上線前的資安檢測完整報告,加上一份可重複執行的稽核 Playbook,讓「系統安全」從個人經驗變成團隊能照著做的標準流程。",
    points: [
      "靜態掃描、相依套件、權限與機敏資料逐項檢查清單",
      "風險分級與修補建議的撰寫範例",
      "可重複執行:換系統也能照表操課",
    ],
    pdfHref: "/docs/security-playbook.pdf",
    accent: "matrix",
  },
];
