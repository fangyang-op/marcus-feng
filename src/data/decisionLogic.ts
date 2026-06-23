import type { L } from "@/i18n/types";

/**
 * ── 決策邏輯 ──────────────────────────────────────────────
 * 跨三個產業養成的六種思維。順時鐘:上 → 右上 → 右下 → 下 → 左下 → 左上,
 * 亦為手機版由上而下的順序。
 */
export type DecisionMode = { name: L; company: L; detail: L };

export const decisionLogic = {
  eyebrow: "Decision logic",
  title: {
    zh: "同一個問題，我習慣換六種腦袋看",
    en: "One problem, six minds I switch between",
  } as L,
  lead: {
    zh: "工具鏈裡能裝下這麼多工具，是因為我待過很不一樣的產業。製造業給我規格與邏輯，影視業給我創意與感性，教育服務給我信任與溫度。這些不是一張換工作的履歷，而是六種能隨情境切換的決策邏輯，也是我能把營運拆解成系統的底層原因。",
    en: "My toolbox got this full because I've worked across very different industries. Manufacturing gave me specs and logic, film gave me creativity and empathy, education gave me trust and warmth. These aren't a list of job changes but six decision-making logics I switch between by context, and the reason I can break operations down into systems.",
  } as L,
  center: { zh: "決策\n邏輯", en: "Decision\nlogic" } as L,
  modes: [
    { name: { zh: "工程師思維", en: "Engineer" }, company: { zh: "和碩 NPI", en: "Pegatron NPI" }, detail: { zh: "邏輯優先、規格驅動、效能執行", en: "Logic-first, spec-driven, performance-focused" } },
    { name: { zh: "企業客戶思維", en: "Enterprise" }, company: { zh: "谷汩 B2B", en: "Group.G B2B" }, detail: { zh: "懂 ROI 語言、客戶管理與決策鏈", en: "Speaks ROI, manages clients and decision chains" } },
    { name: { zh: "管理層思維", en: "Manager" }, company: { zh: "獲得授權帶領團隊", en: "Empowered to lead a team" }, detail: { zh: "從向上管理到下放權力，層層把關", en: "From managing up to delegating down, gatekeeping at each layer" } },
    { name: { zh: "服務端思維", en: "Service" }, company: { zh: "留學顧問 CS", en: "Study-abroad CS" }, detail: { zh: "建立客戶信任，讓成果複利", en: "Builds client trust, compounds results" } },
    { name: { zh: "跨國協作", en: "Cross-border" }, company: { zh: "台灣 / 印尼 / 馬來西亞", en: "Taiwan / Indonesia / Malaysia" }, detail: { zh: "跨文化推進，讓專案不受地域限制", en: "Drives across cultures, frees projects from geography" } },
    { name: { zh: "創意人思維", en: "Creative" }, company: { zh: "谷汩製作現場", en: "Group.G production floor" }, detail: { zh: "在理性與感性之間，跳脫既有框架", en: "Breaks the frame, between rationality and sensibility" } },
  ] as DecisionMode[],
};
