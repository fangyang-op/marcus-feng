import type { TimelineItem } from "./types";

/**
 * ── 經歷時間軸 ────────────────────────────────────────────
 * 精簡呈現，由新到舊。current: true 會在視覺上標記為現職。
 * 要調整經歷內容，直接改下方陣列即可。
 */
export const timeline: TimelineItem[] = [
  {
    org: "FangYang Global Education 放洋留遊學",
    role: {
      zh: "資深營運經理 Senior Operations Manager",
      en: "Senior Operations Manager",
    },
    period: { zh: "現職", en: "Current" },
    current: true,
    points: [
      {
        zh: "主導營收成長 +140%（NT$748 萬 → 1,795 萬），促成 450 萬年度框架合約",
        en: "Drove +140% revenue growth (NT$7.48M → NT$17.95M) and closed a NT$4.5M annual framework contract",
      },
      {
        zh: "辨識營運痛點並親手自建 CRM / Nexus / Matrix 三套內部系統並導入團隊",
        en: "Identified operational pain points and personally built three in-house systems — CRM, Nexus, and Matrix — rolling them out across the team",
      },
      {
        zh: "發起並帶領顧問團隊整併 180+ 份歷年落點分析選校表，建立公司專屬落點資料庫",
        en: "Initiated and led the advisory team in consolidating 180+ historical school-shortlisting analyses into a proprietary admissions database",
      },
      {
        zh: "帶領 4 人團隊、支援 30 人部門，設計績效制度與標準作業流程",
        en: "Led a 4-person team supporting a 30-person department, designing the performance framework and standard operating procedures",
      },
    ],
  },
  {
    org: "Group.G 谷汩文化",
    role: { zh: "製作專案經理", en: "Production Project Manager" },
    period: { zh: "前一段經歷", en: "Previous role" },
    points: [
      {
        zh: "獨立管理 6 個影視製作專案（國際科技公司年度發表、IPO 上市影片、企業形象動畫），半年個人案量突破 NT$350 萬",
        en: "Independently managed 6 film production projects (annual launch for a global tech firm, IPO listing videos, corporate brand animation), generating over NT$3.5M in personal billings within six months",
      },
      {
        zh: "將 3 位企業客戶從單次案升級為年框合約，合計 NT$450 萬",
        en: "Upgraded 3 corporate clients from one-off projects to annual framework contracts worth NT$4.5M combined",
      },
      {
        zh: "規劃 WONDER Media KOL 合作專案，達成 20,000 閱覽、5,000 互動",
        en: "Planned the WONDER Media KOL partnership campaign, reaching 20,000 views and 5,000 engagements",
      },
    ],
  },
  {
    org: "Pegatron 和碩聯合科技",
    role: { zh: "NPI 專案經理", en: "NPI Project Manager" },
    period: { zh: "早期經歷", en: "Earlier" },
    points: [
      {
        zh: "統籌 5 人跨部門 RD 團隊，每週里程碑追蹤，專案較原訂時程提前 2 週交付",
        en: "Coordinated a 5-person cross-functional RD team with weekly milestone tracking, delivering the project 2 weeks ahead of schedule",
      },
      {
        zh: "替代材料驗證使量產成本降低 1.3%；舊版庫存消化 98%，促成國際客戶追加 21.5 萬機台",
        en: "Validated alternative materials to cut mass-production cost by 1.3%; cleared 98% of legacy inventory, prompting a global client to reorder 215,000 units",
      },
    ],
  },
  {
    org: "NTUST 國立臺灣科技大學",
    role: { zh: "應用外語系 學士", en: "B.A. in Applied Foreign Languages" },
    period: { zh: "學歷", en: "Education" },
    points: [
      {
        zh: "GPA 3.9 · TOEIC 950",
        en: "GPA 3.9 · TOEIC 950",
      },
      {
        zh: "在學期間主辦全國最大規模語言教學國際研討會（82 位講者、15 國 380+ 人次）",
        en: "Organized the nation's largest international conference on language teaching (82 speakers, 380+ attendees from 15 countries)",
      },
    ],
  },
];
