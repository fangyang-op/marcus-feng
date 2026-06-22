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
      en: "My career didn't start in operations. It began in manufacturing project management as an NPI engineer at Pegatron. From hardware introduction to film and TV production to education services, that cross-industry path gave me one habit: understand what's really hurting the business before deciding how to fix it.",
    },
    {
      zh: "在放洋留遊學，我發現營運的瓶頸其實並非「不夠努力」，而是在「沒有系統」的情況下努力錯了方向，不只是資料散落各地，流程更是只靠口頭轉述，沒有文件落地導致知識留在個人腦中。於是我做了一件營運人通常不會做的事，以非工程背景，親手用 AI 協作開發把 CRM、數據分析、知識庫三套系統建出來，並導入團隊，成為顧問們日常工作流不可或缺的環節。",
      en: "At FangYang Global Education, I learned the bottleneck wasn't a lack of effort. It was effort spent in the wrong direction because there was no system underneath. Data was scattered, processes were passed on by word of mouth alone, and with nothing written down, knowledge stayed locked in people's heads. So I did something most operations people never do. With no engineering background, I used AI-assisted development to build three systems myself (a CRM, an analytics platform, and a knowledge base), then rolled them out across the team until they became an indispensable part of the consultants' daily workflow.",
    },
    {
      zh: "我相信營運的價值不只是「把事做完」，而是「把事變成可複製、可傳承的系統」。這也是我和「只會用工具的人」最大的不同，我能夠把方法寫成文檔，讓團隊能繼承，讓組織不依賴任何單一個人。",
      en: "I believe the value of operations isn't just getting things done. It's turning the work into systems that can be replicated and handed on. That's the biggest difference between me and someone who only knows how to use the tools. I write the method down so the team can inherit it, and so the organization never depends on any single person.",
    },
  ] satisfies L[],
};
