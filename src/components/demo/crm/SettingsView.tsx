"use client";

import { useState } from "react";
import {
  Settings,
  Users2,
  Tags,
  FileText,
  ShieldCheck,
  Building2,
  Bell,
  UserPlus,
  Inbox,
  ChevronRight,
  ArrowLeft,
  Search,
  Plus,
  Pencil,
  type LucideIcon,
} from "lucide-react";

import {
  PageContainer,
  PageTitle,
  Card,
  Pill,
} from "@/components/demo/primitives";
import { DemoModal, DemoToast } from "@/components/demo/widgets";
import {
  REFERRERS,
  REFERRER_TYPE_PILL,
  LEAD_SOURCES,
} from "@/data/demo/crm";

/** 可進入真子頁的模組 key */
type SubpageKey = "referrers" | "sources";

interface SettingCard {
  icon: LucideIcon;
  title: string;
  desc: string;
  /** 角落小統計，讓設定看起來真的在運作 */
  stat: string;
  /** 點擊行為:開 Modal(條列)或進入子頁 */
  detail?: string[];
  subpage?: SubpageKey;
}

const SETTING_CARDS: SettingCard[] = [
  {
    icon: Users2,
    title: "成員與權限",
    desc: "管理顧問帳號、角色與部門",
    stat: "8 位顧問 · 3 個部門",
    detail: [
      "前端 / 後端顧問角色與權限矩陣",
      "部門分組與主管指派",
      "登入裝置與單一登入(SSO)設定",
      "離職帳號停用與資料移交",
    ],
  },
  {
    icon: UserPlus,
    title: "轉介人",
    desc: "管理個人 / 機構 / 學校 / 夥伴轉介來源",
    stat: `${REFERRERS.length} 位轉介人`,
    subpage: "referrers",
  },
  {
    icon: Inbox,
    title: "名單來源",
    desc: "設定名單進線管道與分類",
    stat: `${LEAD_SOURCES.length} 個來源`,
    subpage: "sources",
  },
  {
    icon: Tags,
    title: "學生狀態",
    desc: "自訂招生 / 成交 / 申請各階段狀態",
    stat: "14 個狀態 · 4 大分類",
    detail: [
      "新增、停用與排序自訂狀態",
      "狀態自動轉換規則(如成交後啟動服務)",
      "各階段對應的待辦與提醒模板",
      "看板欄位與狀態的對應設定",
    ],
  },
  {
    icon: FileText,
    title: "文件模板",
    desc: "設定申請準備 Checklist 清單",
    stat: "6 份必備 · 12 份選用",
    detail: [
      "依國家 / 學位套用不同 Checklist",
      "文件版本控管與審核流程",
      "字數方案與餘額扣抵規則",
      "推薦信邀請與回收追蹤",
    ],
  },
  {
    icon: Building2,
    title: "方案與績效",
    desc: "服務方案、金額與分潤規則",
    stat: "5 種方案 · 自訂分潤",
    detail: [
      "標準 / 旗艦方案定價與內容",
      "前端 / 後端 / 轉介分潤比例",
      "業績結算週期與報表",
      "退款與方案調整紀錄",
    ],
  },
  {
    icon: Bell,
    title: "通知設定",
    desc: "待辦提醒與重複名單告警",
    stat: "Email · LINE · 站內",
    detail: [
      "截止日逼近與逾期申請提醒",
      "未分配後端顧問告警",
      "重複手機 / Email 名單偵測",
      "每日營運摘要推播時間",
    ],
  },
  {
    icon: ShieldCheck,
    title: "資料與稽核",
    desc: "活動紀錄與資料保留政策",
    stat: "留存 365 天",
    detail: [
      "完整操作活動紀錄(Audit Log)",
      "個資存取權限與遮罩規則",
      "資料匯出與備份排程",
      "資料保留與刪除政策",
    ],
  },
];

export function SettingsView() {
  const [openCard, setOpenCard] = useState<SettingCard | null>(null);
  /** 目前進入的子頁;null = 設定總覽 */
  const [subpage, setSubpage] = useState<SubpageKey | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fireToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  if (subpage === "referrers") {
    return (
      <>
        <ReferrersSubpage
          onBack={() => setSubpage(null)}
          onToast={fireToast}
        />
        <DemoToast message={toast} accentClass="bg-crm" />
      </>
    );
  }
  if (subpage === "sources") {
    return (
      <>
        <LeadSourcesSubpage
          onBack={() => setSubpage(null)}
          onToast={fireToast}
        />
        <DemoToast message={toast} accentClass="bg-crm" />
      </>
    );
  }

  return (
    <PageContainer>
      <PageTitle
        icon={Settings}
        title="設定"
        subtitle={`${SETTING_CARDS.length} 個系統模組 · 轉介人 / 名單來源可進入子頁管理`}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SETTING_CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.title} className="p-0">
              <button
                type="button"
                onClick={() =>
                  c.subpage ? setSubpage(c.subpage) : setOpenCard(c)
                }
                className="flex h-full w-full flex-col items-start p-5 text-left transition-colors hover:bg-crm-soft/30"
              >
                <div className="flex w-full items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-crm-soft text-crm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </div>
                <h3 className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  {c.title}
                  {c.subpage && (
                    <span className="rounded bg-crm-soft px-1.5 py-0.5 text-[10px] font-semibold text-crm">
                      子頁
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-xs text-ink-muted">{c.desc}</p>
                <span className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-ink-soft">
                  {c.stat}
                </span>
              </button>
            </Card>
          );
        })}
      </div>

      <DemoModal
        open={openCard !== null}
        onClose={() => setOpenCard(null)}
        title={openCard ? `${openCard.title} · 可設定項目` : ""}
        accentClass="bg-crm"
      >
        {openCard?.detail && (
          <div>
            <p className="text-ink-soft">{openCard.desc}</p>
            <ul className="mt-3 space-y-2">
              {openCard.detail.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-ink-soft">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crm" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-muted">
              此模組於作品集 Demo 中為示意，正式系統可實際設定並寫入資料。
            </p>
          </div>
        )}
      </DemoModal>

      <DemoToast message={toast} accentClass="bg-crm" />
    </PageContainer>
  );
}

/* ── 子頁共用:返回列 ─────────────────────────────────────── */
function SubpageHeader({
  icon: Icon,
  title,
  subtitle,
  onBack,
  onAdd,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onBack: () => void;
  onAdd: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-crm"
      >
        <ArrowLeft className="h-4 w-4" /> 返回設定
      </button>
      <PageTitle
        icon={Icon}
        title={title}
        subtitle={subtitle}
        right={
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 rounded-lg bg-crm px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> 新增
          </button>
        }
      />
    </>
  );
}

function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative mb-4 max-w-xs">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-ink-soft outline-none focus:border-crm"
      />
    </div>
  );
}

function StatusPill({ active }: { active: boolean }) {
  return (
    <Pill color={active ? "emerald" : "slate"}>{active ? "啟用" : "停用"}</Pill>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-ink-soft transition-colors hover:bg-crm-soft/40 hover:text-crm"
    >
      <Pencil className="h-3 w-3" /> 編輯
    </button>
  );
}

/* ── 子頁:轉介人 ─────────────────────────────────────────── */
function ReferrersSubpage({
  onBack,
  onToast,
}: {
  onBack: () => void;
  onToast: (msg: string) => void;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const rows = REFERRERS.filter(
    (r) =>
      q === "" ||
      r.name.toLowerCase().includes(q) ||
      r.type.includes(q) ||
      r.contact.toLowerCase().includes(q)
  );

  return (
    <PageContainer>
      <SubpageHeader
        icon={UserPlus}
        title="轉介人管理"
        subtitle={`${REFERRERS.length} 位轉介人 · 個人 / 機構 / 學校 / 夥伴`}
        onBack={onBack}
        onAdd={() => onToast("已開啟新增轉介人(Demo 示意)")}
      />
      <SearchBox
        value={query}
        onChange={setQuery}
        placeholder="搜尋姓名 / 類型 / 聯絡方式"
      />
      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold text-ink-muted">
                <th className="px-4 py-2.5">姓名</th>
                <th className="px-4 py-2.5">類型</th>
                <th className="px-4 py-2.5">聯絡方式</th>
                <th className="px-4 py-2.5 text-right">轉介人數</th>
                <th className="px-4 py-2.5">狀態</th>
                <th className="px-4 py-2.5 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-2.5 font-medium text-ink">{r.name}</td>
                  <td className="px-4 py-2.5">
                    <Pill color={REFERRER_TYPE_PILL[r.type]}>{r.type}</Pill>
                  </td>
                  <td className="px-4 py-2.5 text-ink-muted">{r.contact}</td>
                  <td className="px-4 py-2.5 text-right tabular text-ink-soft">
                    {r.referred}
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusPill active={r.active} />
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <EditButton
                      onClick={() =>
                        onToast(`已開啟「${r.name}」編輯(Demo 示意)`)
                      }
                    />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-ink-muted"
                  >
                    查無符合的轉介人
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}

/* ── 子頁:名單來源 ───────────────────────────────────────── */
function LeadSourcesSubpage({
  onBack,
  onToast,
}: {
  onBack: () => void;
  onToast: (msg: string) => void;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const rows = LEAD_SOURCES.filter(
    (s) =>
      q === "" ||
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
  );
  const monthlyTotal = LEAD_SOURCES.reduce((sum, s) => sum + s.monthlyLeads, 0);

  return (
    <PageContainer>
      <SubpageHeader
        icon={Inbox}
        title="名單來源管理"
        subtitle={`${LEAD_SOURCES.length} 個來源 · 本月共進線 ${monthlyTotal} 筆名單`}
        onBack={onBack}
        onAdd={() => onToast("已開啟新增名單來源(Demo 示意)")}
      />
      <SearchBox
        value={query}
        onChange={setQuery}
        placeholder="搜尋來源名稱 / 分類"
      />
      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold text-ink-muted">
                <th className="px-4 py-2.5">來源名稱</th>
                <th className="px-4 py-2.5">分類</th>
                <th className="px-4 py-2.5 text-right">本月新增</th>
                <th className="px-4 py-2.5">狀態</th>
                <th className="px-4 py-2.5 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-2.5 font-medium text-ink">{s.name}</td>
                  <td className="px-4 py-2.5 text-ink-muted">{s.category}</td>
                  <td className="px-4 py-2.5 text-right tabular text-ink-soft">
                    {s.monthlyLeads}
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusPill active={s.active} />
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <EditButton
                      onClick={() =>
                        onToast(`已開啟「${s.name}」編輯(Demo 示意)`)
                      }
                    />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm text-ink-muted"
                  >
                    查無符合的名單來源
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}
