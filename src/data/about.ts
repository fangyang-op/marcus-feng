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
      zh: "我的職涯起點是在製造業擔任專案管理（和碩 NPI）。從硬體導入，後來轉進影視製作、再到教育服務，這條跨產業的路徑讓我養成一個習慣：先看懂業務的真正痛點，再決定怎麼解。",
      en: "My career began in manufacturing, in project management as an NPI PM at Pegatron. Starting with hardware introduction, I later moved into film and TV production and then into education services, and that cross-industry path gave me one habit: understand what's really hurting the business before deciding how to solve it.",
    },
    {
      zh: "在現職的留學代辦，我發現部門的瓶頸其實並非「不夠努力」，而是在「沒有系統」的情況下努力錯了方向，不只是資料散落各地、流程更是仰賴口耳相傳，而這也是不少團隊的痛點：缺少了能夠落地的文件，知識留在個人大腦裡，便無法進一步系統化。於是我做了一件營運人通常不會做的事，以非工程背景，親手用 AI 協作開發把 CRM、數據分析、知識庫三套系統建出來，並導入團隊，建構了顧問們日常不可或缺的工作流。",
      en: "At the study-abroad agency where I work now, I found the department's bottleneck wasn't a lack of effort. It was effort spent in the wrong direction for lack of a system. Data was scattered, and processes relied on word of mouth. This is a pain point for plenty of teams: with nothing properly documented, knowledge stays in individuals' heads and can never be systematized. So I did something most operations managers wouldn't do, that is, even with no engineering background, I conducted AI-assisted development to build three systems myself (a CRM, an analytics platform, and a knowledge base), rolled them out to the team, and built a workflow the consultants now can't do without.",
    },
    {
      zh: "我相信營運的價值不只是「把事做完」，而是「把事變成可複製、可傳承的系統」。這也是我和「只會用工具的人」最大的不同，我能夠把方法寫成可被複製的方法論，讓團隊能繼承，讓組織不依賴任何單一個人。",
      en: "I believe the value of operations isn't just getting things done. It's turning the work into systems that can be replicated and handed on. That's the biggest difference between me and someone who only knows how to use the tools. I can turn what I do into a repeatable methodology, so the team can inherit it and the organization never depends on any single person.",
    },
  ] satisfies L[],
};
