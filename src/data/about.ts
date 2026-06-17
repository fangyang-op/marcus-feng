/**
 * ── 關於我 / About ────────────────────────────────────────
 * 一段更有故事性的短文（非履歷自傳）。改文字、換照片都在這裡。
 * 照片放 /public/images/（目前用你提供的 profile.jpeg；要換照片替換同名檔即可）。
 */
import type { L } from "@/i18n/types";

export const about = {
  eyebrow: "About",
  title: {
    zh: "關於我",
    en: "About Me",
  } satisfies L,
  /** 照片（放在 /public/images/ 下） */
  photo: "/images/profile.jpeg",
  photoAlt: "馮若陽 Marcus Feng",
  /** 2–3 段短文，段落之間會自動留白 */
  paragraphs: [
    {
      zh: "我的職涯起點不是營運，而是製造業的專案管理（和碩 NPI）。從硬體導入、影視製作到教育服務，這條跨產業的路徑讓我養成一個習慣：先看懂業務的真正痛點，再決定怎麼解。",
      en: "I didn't start out in operations — I began in manufacturing project management as an NPI engineer at Pegatron. From hardware introduction to film and TV production to education services, that cross-industry path taught me one habit: understand what's truly hurting the business before deciding how to fix it.",
    },
    {
      zh: "在放洋留遊學，我發現營運的瓶頸不在「不夠努力」，而在「沒有系統」——資料散落、流程靠人、知識留在個人腦中。於是我做了一件營運人通常不會做的事：以非工程背景，親手用 AI 協作開發把 CRM、數據分析、知識庫三套系統建出來，並導入團隊。",
      en: "At FangYang Global Education, I realized the bottleneck in operations wasn't a lack of effort — it was the lack of systems. Data was scattered, processes lived in people's heads, and knowledge never left individual minds. So I did something most operations people wouldn't: with no engineering background, I hand-built three systems — a CRM, an analytics platform, and a knowledge base — through AI-assisted development, then rolled them out across the team.",
    },
    {
      zh: "我相信營運的價值不只是「把事做完」，而是「把事變成可複製、可傳承的系統」。這也是我和「只會用工具的人」最大的不同——我把方法寫成文檔，讓團隊能繼承，讓組織不依賴任何單一個人。",
      en: "I believe the value of operations isn't just getting things done — it's turning the work into systems that can be replicated and passed on. That's also the biggest difference between me and someone who merely knows how to use the tools: I document the method so the team can inherit it, so the organization never depends on any single person.",
    },
  ] satisfies L[],
};
