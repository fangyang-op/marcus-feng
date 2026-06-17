import type { L } from "@/i18n/types";

/**
 * ── 介面文案（中英）──────────────────────────────────────
 * 各區段標題、按鈕等「非資料」的 UI 字串。eyebrow 小標本來就是英文，兩語系共用。
 */
export const ui = {
  metrics: {
    eyebrow: "Impact",
    title: { zh: "可量化的營運成果", en: "Operational impact, quantified" } as L,
    description: {
      zh: "不只「做過」，而是把營運決策變成能用數字驗證的結果。",
      en: "Not just “done” — operational decisions turned into results you can verify with numbers.",
    } as L,
  },

  projects: {
    eyebrow: "Featured Projects",
    title: { zh: "我親手建出來的系統", en: "Systems I built myself" } as L,
    description: {
      zh: "每一個都從真實營運痛點出發，由我設計、用 AI 協作開發、實際導入團隊使用。點「進入 Demo」可操作 UI 骨架（資料皆為示意）。",
      en: "Each one started from a real operational pain point — designed by me, built with AI, and rolled out to the team. Click “Open demo” to try the UI skeletons (all data is illustrative).",
    } as L,
    viewDetails: { zh: "查看說明", en: "View details" } as L,
    openDemo: { zh: "進入 Demo", en: "Open demo" } as L,
    /** En 模式下，有 Demo 的卡片提示 Demo 內容為中文 */
    demoInChinese: { zh: "", en: "Demo UI is in Chinese" } as L,
  },

  knowledge: {
    eyebrow: "Knowledge Transfer",
    title: {
      zh: "把個人工作變成團隊可繼承的資產",
      en: "Turning my work into assets the team can inherit",
    } as L,
    description: {
      zh: "會建系統還不夠 —— 我把建置過程、AI 協作方法與資安稽核寫成文件，讓接手的人看得懂、用得上。這是我和「只會用工具的人」最大的不同。",
      en: "Building systems isn’t enough — I document the build process, my AI workflow and security audits so whoever takes over can actually use them. That’s what sets me apart from people who just use tools.",
    } as L,
    download: { zh: "下載 PDF", en: "Download PDF" } as L,
    request: { zh: "面試中提供 / 來信索取", en: "Available on request" } as L,
  },

  skills: {
    eyebrow: "Capabilities",
    title: { zh: "工具鏈 × 營運能力", en: "Toolchain × Operations" } as L,
    description: {
      zh: "左邊是我用來把想法變成系統的技術；右邊是我作為營運人的核心職能。兩者結合，才能既看得到問題、也做得出解法。",
      en: "On the left, the tech I use to turn ideas into systems; on the right, my core skills as an operations person. Together, they let me both spot problems and ship solutions.",
    } as L,
    toolchainTitle: { zh: "工具鏈 Toolchain", en: "Toolchain" } as L,
    toolchainSub: {
      zh: "親手建系統用的技術",
      en: "Tech I use to build systems",
    } as L,
    operationsTitle: { zh: "營運能力 Operations", en: "Operations" } as L,
    operationsSub: {
      zh: "辨識問題與帶團隊的職能",
      en: "Spotting problems & leading teams",
    } as L,
  },

  timeline: {
    eyebrow: "Experience",
    title: { zh: "經歷", en: "Experience" } as L,
    description: {
      zh: "從製造業專案管理到留遊學營運，一路把「發現問題」延伸到「動手建系統」。",
      en: "From manufacturing project management to study-abroad operations — consistently extending “spotting the problem” into “building the fix.”",
    } as L,
    current: { zh: "現職", en: "Current" } as L,
  },

  footer: {
    eyebrow: "Get in touch",
    title: {
      zh: "想找一位「能自己動手建系統的營運人」？",
      en: "Looking for an operations leader who actually builds systems?",
    } as L,
    description: {
      zh: "無論是營運制度、CRM / 數據系統建置，或 AI 導入，歡迎聊聊。",
      en: "Whether it’s operational processes, CRM / data systems, or AI adoption — let’s talk.",
    } as L,
  },
};
