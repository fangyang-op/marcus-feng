"use client";

import { useState } from "react";
import { ArrowLeft, Coins, CheckCircle2, Circle, Pencil, Lock } from "lucide-react";

import {
  PageContainer,
  Card,
  Pill,
  ProgressBar,
} from "@/components/demo/primitives";
import {
  getStudentDetail,
  STATUS_META,
  APP_STATUS_META,
  isOverdue,
  isStudentUnlocked,
  type StudentDetail,
  type ApplicationCard,
} from "@/data/demo/crm";
import { DemoToast } from "@/components/demo/widgets";

type TabKey =
  | "overview"
  | "timeline"
  | "scores"
  | "deals"
  | "schools"
  | "documents"
  | "applications";

/** 永遠可用的 tab(不受成交與否影響) */
const ALWAYS_OPEN: TabKey[] = ["overview", "timeline", "scores"];

/** 成交後才解鎖的 tab */
const LOCKABLE: TabKey[] = ["deals", "schools", "documents", "applications"];

const TAB_ITEMS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "概覽" },
  { key: "timeline", label: "時間軸" },
  { key: "scores", label: "成績" },
  { key: "deals", label: "成交" },
  { key: "schools", label: "選校表" },
  { key: "documents", label: "文件" },
  { key: "applications", label: "申請" },
];

export function StudentDetailView({
  studentId,
  onBack,
}: {
  studentId: string;
  onBack: () => void;
}) {
  const [tab, setTab] = useState<TabKey>("overview");
  const [toast, setToast] = useState<string | null>(null);
  const detail = getStudentDetail(studentId);
  const status = STATUS_META[detail.statusCode];

  // 依「該學生」的狀態判斷四個進階 tab 是否解鎖
  const unlocked = isStudentUnlocked(detail.statusCode);

  // 防呆:若目前選中的是被鎖的 tab(理論上點不到),一律退回「概覽」,
  // 絕不渲染被鎖頁面的內容。
  const isTabLocked = (key: TabKey) => !unlocked && LOCKABLE.includes(key);
  const activeTab: TabKey = isTabLocked(tab) ? "overview" : tab;

  const fireToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const onTabClick = (key: TabKey) => {
    if (isTabLocked(key)) return; // 上鎖:點了不切換
    setTab(key);
  };

  return (
    <PageContainer>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-crm"
      >
        <ArrowLeft className="h-4 w-4" /> 返回學生列表
      </button>

      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-ink">{detail.fullName}</h2>
          <span className="text-base font-normal text-ink-muted">
            {detail.englishName}
          </span>
          <button
            type="button"
            onClick={() => fireToast("狀態切換為示意,正式系統可直接變更")}
            className="transition-transform hover:scale-105"
            title="點擊變更狀態(Demo 示意)"
          >
            <Pill color={status?.color ?? "slate"}>{status?.label ?? "—"}</Pill>
          </button>
        </div>
        <button
          type="button"
          onClick={() => fireToast("編輯模式為 Demo 示意,正式系統可寫入資料")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-slate-50"
        >
          <Pencil className="h-4 w-4" /> 編輯
        </button>
      </div>

      <div className="mb-5">
        <div className="flex gap-1 overflow-x-auto border-b border-slate-200">
          {TAB_ITEMS.map((item) => {
            const locked = isTabLocked(item.key);
            const active = item.key === activeTab && !locked;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onTabClick(item.key)}
                disabled={locked}
                aria-disabled={locked}
                title={locked ? "此分頁於成交後解鎖" : undefined}
                className={`-mb-px flex shrink-0 items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-crm text-crm"
                    : locked
                      ? "cursor-not-allowed border-transparent text-slate-300"
                      : "border-transparent text-ink-muted hover:text-ink-soft"
                }`}
              >
                {locked && <Lock className="h-3.5 w-3.5" />}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 上鎖說明:招生中 / 暫停未成交時,提示四個進階分頁尚未開放 */}
      {!unlocked && (
        <LockNotice statusLabel={status?.label ?? "—"} />
      )}

      {activeTab === "overview" && <OverviewTab detail={detail} />}
      {activeTab === "timeline" && <TimelineTab detail={detail} />}
      {activeTab === "scores" && <ScoresTab detail={detail} />}
      {activeTab === "deals" && <DealsTab detail={detail} />}
      {activeTab === "schools" && <SchoolsTab detail={detail} />}
      {activeTab === "documents" && (
        <DocumentsTab detail={detail} onToast={fireToast} />
      )}
      {activeTab === "applications" && <ApplicationsTab detail={detail} />}

      <DemoToast message={toast} accentClass="bg-crm" />
    </PageContainer>
  );
}

/* ── 上鎖說明區塊 ─────────────────────────────────────────── */
function LockNotice({ statusLabel }: { statusLabel: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-start gap-3 rounded-xl border border-crm/20 bg-crm-soft/50 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-crm-soft text-crm">
        <Lock className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-crm-ink">
          此學生尚未成交(目前狀態:{statusLabel})
        </p>
        <p className="mt-0.5 text-sm text-ink-soft">
          「成交 / 選校表 / 文件 / 申請」四個分頁會在成交後自動解鎖。
          現階段可使用「概覽 / 時間軸 / 成績」掌握名單背景與在校表現。
        </p>
      </div>
    </div>
  );
}

/* ── 概覽 ─────────────────────────────────────────────────── */
function OverviewTab({ detail }: { detail: StudentDetail }) {
  const { wordQuota, checklist } = detail;
  const doneCount = checklist.filter((c) => c.done).length;
  return (
    <div className="space-y-4">
      {/* 字數餘額 + Checklist */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-ink-muted">
                <Coins className="h-4 w-4 text-crm" /> 字數餘額
              </div>
              <div className="mt-2 text-3xl font-bold tabular text-crm-ink">
                {wordQuota.balance.toLocaleString()}
                <span className="ml-1 text-base font-medium text-ink-muted">字</span>
              </div>
            </div>
            <Pill color="pink">旗艦方案</Pill>
          </div>
          <div className="mt-4">
            <ProgressBar
              value={wordQuota.used}
              max={wordQuota.total}
              className="bg-crm"
              track="bg-crm-soft"
            />
            <div className="mt-1.5 flex justify-between text-xs text-ink-muted">
              <span>已用 {wordQuota.used.toLocaleString()} 字</span>
              <span>總額 {wordQuota.total.toLocaleString()} 字</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">申請準備 Checklist</span>
            <span className="text-xs text-ink-muted">
              {doneCount} / {checklist.length} 完成
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {checklist.map((c) => (
              <li key={c.label} className="flex items-center gap-2 text-sm">
                {c.done ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-slate-300" />
                )}
                <span className={c.done ? "text-ink-soft" : "text-ink-muted"}>
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 資訊卡 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoCard title="基本資料" rows={detail.basic} />
        <InfoCard title="當前學歷" rows={detail.currentEdu} />
        <InfoCard title="申請目標" rows={detail.target} />
        <InfoCard title="名單來源 + 顧問" rows={detail.relations} />
      </div>
    </div>
  );
}

function InfoCard({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <Card>
      <h3 className="mb-3 text-base font-semibold text-ink">{title}</h3>
      <dl className="grid grid-cols-[110px_1fr] gap-y-2 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="contents">
            <dt className="text-ink-muted">{r.label}</dt>
            <dd className="text-ink-soft">{r.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

/* ── 時間軸 ───────────────────────────────────────────────── */
function TimelineTab({ detail }: { detail: StudentDetail }) {
  return (
    <Card>
      <ol className="relative space-y-5 border-l border-slate-200 pl-6">
        {detail.timeline.map((ev) => (
          <li key={ev.date} className="relative">
            <span className="absolute -left-[26px] top-1 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-crm" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-ink">{ev.title}</span>
              <Pill color={ev.color}>{ev.date}</Pill>
            </div>
            <p className="mt-0.5 text-sm text-ink-muted">{ev.desc}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}

/* ── 成績 ─────────────────────────────────────────────────── */
function ScoresTab({ detail }: { detail: StudentDetail }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {detail.scores.map((s) => (
        <Card key={s.type}>
          <div className="flex items-center justify-between">
            <Pill color={s.color}>{s.type}</Pill>
            <span className="text-xs text-ink-muted">{s.date}</span>
          </div>
          <div className="mt-3 text-2xl font-bold tabular text-ink">{s.total}</div>
          <div className="mt-1 text-xs text-ink-muted">{s.sub}</div>
        </Card>
      ))}
    </div>
  );
}

/* ── 成交 ─────────────────────────────────────────────────── */
function DealsTab({ detail }: { detail: StudentDetail }) {
  const { deals } = detail;
  if (deals.splits.length === 0) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-crm-soft text-crm">
            <Coins className="h-6 w-6" />
          </span>
          <p className="text-sm font-semibold text-ink">尚未成交</p>
          <p className="max-w-xs text-xs text-ink-muted">
            此學生目前為招生階段({STATUS_META[detail.statusCode]?.label ?? "—"}),
            成交後此處將顯示方案金額與顧問績效拆分。
          </p>
        </div>
      </Card>
    );
  }
  return (
    <Card>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="text-sm text-ink-muted">方案</div>
          <div className="mt-0.5 text-base font-semibold text-ink">{deals.plan}</div>
          <div className="mt-1 text-xs text-ink-muted">成交日 {deals.signedAt}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-ink-muted">成交金額</div>
          <div className="mt-0.5 text-2xl font-bold tabular text-crm-ink">
            {deals.amount}
          </div>
        </div>
      </div>
      <h4 className="mt-4 mb-2 text-sm font-semibold text-ink">績效拆分</h4>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold text-ink-muted">
              <th className="px-4 py-2">顧問</th>
              <th className="px-4 py-2">角色</th>
              <th className="px-4 py-2 text-right">分潤比例</th>
            </tr>
          </thead>
          <tbody>
            {deals.splits.map((sp) => (
              <tr key={sp.name} className="border-t border-slate-100">
                <td className="px-4 py-2.5 font-medium text-ink">{sp.name}</td>
                <td className="px-4 py-2.5 text-ink-soft">{sp.role}</td>
                <td className="px-4 py-2.5 text-right tabular text-ink-soft">
                  {sp.share}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ── 選校表 ───────────────────────────────────────────────── */
const TIER_META: Record<
  "dream" | "match" | "safety",
  { label: string; color: "rose" | "violet" | "emerald" }
> = {
  dream: { label: "衝刺 Dream", color: "rose" },
  match: { label: "主攻 Match", color: "violet" },
  safety: { label: "保底 Safety", color: "emerald" },
};

function SchoolsTab({ detail }: { detail: StudentDetail }) {
  const tiers: ("dream" | "match" | "safety")[] = ["dream", "match", "safety"];
  return (
    <div className="space-y-4">
      {tiers.map((tier) => {
        const rows = detail.schoolList.filter((s) => s.tier === tier);
        const meta = TIER_META[tier];
        return (
          <Card key={tier}>
            <div className="mb-3 flex items-center gap-2">
              <Pill color={meta.color}>{meta.label}</Pill>
              <span className="text-xs text-ink-muted">{rows.length} 所</span>
            </div>
            <ul className="divide-y divide-slate-100">
              {rows.map((s) => (
                <li
                  key={s.school}
                  className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm"
                >
                  <div>
                    <span className="font-medium text-ink">{s.school}</span>
                    <span className="ml-2 text-ink-muted">{s.program}</span>
                  </div>
                  <span className="text-xs text-ink-muted">{s.country}</span>
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}

/* ── 文件 ─────────────────────────────────────────────────── */
function DocumentsTab({
  detail,
  onToast,
}: {
  detail: StudentDetail;
  onToast: (msg: string) => void;
}) {
  const doneCount = detail.checklist.filter((c) => c.done).length;
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-ink">文件清單</h3>
        <span className="text-xs text-ink-muted">
          {doneCount} / {detail.checklist.length} 已上傳
        </span>
      </div>
      <ul className="divide-y divide-slate-100">
        {detail.checklist.map((c) => (
          <li
            key={c.label}
            className="flex items-center justify-between gap-3 py-2.5 text-sm"
          >
            <span className="text-ink-soft">{c.label}</span>
            <div className="flex items-center gap-2">
              <Pill color={c.done ? "emerald" : "slate"}>
                {c.done ? "已上傳" : "待補"}
              </Pill>
              <button
                type="button"
                onClick={() =>
                  onToast(
                    c.done
                      ? `已開啟「${c.label}」預覽(Demo 示意)`
                      : `已提醒學生補交「${c.label}」(Demo 示意)`
                  )
                }
                className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-ink-soft transition-colors hover:bg-slate-50"
              >
                {c.done ? "預覽" : "催繳"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ── 申請(精簡卡片清單)─────────────────────────────────── */
function ApplicationsTab({ detail }: { detail: StudentDetail }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {detail.applications.map((a) => (
        <AppMiniCard key={a.id} app={a} />
      ))}
    </div>
  );
}

function AppMiniCard({ app }: { app: ApplicationCard }) {
  const meta = APP_STATUS_META[app.statusCode];
  const overdue = isOverdue(app);
  return (
    <Card>
      <div className="flex items-center justify-between">
        <Pill color={meta.pill}>{meta.label}</Pill>
        <span className="text-xs text-ink-muted">{app.round}</span>
      </div>
      <div className="mt-2 text-sm font-semibold text-ink">{app.school}</div>
      <div className="text-xs text-ink-muted">{app.program}</div>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-ink-muted">{app.country}</span>
        <span className={overdue ? "font-semibold text-rose-600" : "text-ink-muted"}>
          截止 {app.deadline}
        </span>
      </div>
    </Card>
  );
}
