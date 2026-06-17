"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Lightbulb,
  Users,
  TrendingUp,
  FileCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import {
  PageContainer,
  PageTitle,
  Card,
} from "@/components/demo/primitives";
import { DemoModal, FlipCard } from "@/components/demo/widgets";
import { DASHBOARD_STATS, STUDENTS, isUnassignedBackend } from "@/data/demo/crm";

const STAT_ICONS = [Users, Sparkles, FileCheck, TrendingUp];

/** KPI 卡背面補充說明(翻轉卡用),deterministic 寫死 */
const STAT_BACK: { title: string; lines: string[] }[] = [
  { title: "依分類", lines: ["招生中 5 · 申請中 13", "已成交(本月)3 · 暫停 0"] },
  { title: "招生漏斗", lines: ["新名單 → 諮詢 → 確認需求", "本週新進線 4 筆"] },
  { title: "申請進度", lines: ["送件中 4 · 等待結果 2", "已入學 1 · 行前準備 1"] },
  { title: "成交來源", lines: ["同事轉介 2 · 教育展 1", "客單均價 NT$ 142,000"] },
];

export function DashboardView({ onGoUnassigned }: { onGoUnassigned: () => void }) {
  const [showDup, setShowDup] = useState(false);
  const unassignedCount = STUDENTS.filter(isUnassignedBackend).length;
  const dupCount = 2;

  return (
    <PageContainer>
      <PageTitle
        title="儀表板"
        subtitle="歡迎回來。今日營運摘要與待辦提醒都在這裡。"
      />

      {/* 琥珀色提醒卡 */}
      <div className="mb-5 space-y-3">
        <button
          type="button"
          onClick={onGoUnassigned}
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-left text-sm shadow-sm transition-colors hover:bg-amber-100"
        >
          <div className="flex items-center gap-2.5">
            <Lightbulb className="h-5 w-5 shrink-0 text-amber-600" />
            <span className="text-amber-900">
              目前尚有{" "}
              <strong className="tabular">{unassignedCount}</strong>{" "}
              位學生尚未分配後端顧問
            </span>
          </div>
          <span className="flex shrink-0 items-center gap-1 font-medium text-amber-800">
            查看清單 <ArrowRight className="h-4 w-4" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setShowDup(true)}
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-left text-sm shadow-sm transition-colors hover:bg-amber-100"
        >
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
            <span className="text-amber-900">
              有 <strong className="tabular">{dupCount}</strong>{" "}
              筆名單覆蓋了重複手機號碼,請確認
            </span>
          </div>
          <span className="flex shrink-0 items-center gap-1 font-medium text-amber-800">
            查看明細 <ArrowRight className="h-4 w-4" />
          </span>
        </button>
      </div>

      {/* KPI 卡(可翻轉) */}
      <p className="mb-2 text-xs text-ink-muted">點擊卡片可翻面看細項分布</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat, i) => (
          <FlipCard
            key={stat.label}
            minHeight={132}
            front={
              <KpiFront
                label={stat.label}
                value={stat.value}
                hint={stat.hint}
                delta={stat.delta}
                icon={STAT_ICONS[i]}
              />
            }
            back={<KpiBack title={STAT_BACK[i].title} lines={STAT_BACK[i].lines} />}
          />
        ))}
      </div>

      {/* 重複名單 Modal */}
      <DemoModal
        open={showDup}
        onClose={() => setShowDup(false)}
        title="重複手機號碼名單"
        accentClass="bg-crm"
      >
        <div>
          <p className="text-ink-soft">
            系統偵測到 2 組名單的手機號碼重複,可能為同一位學生重複進線,建議合併或標記。
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
              <span className="text-ink">林芷晴 · 09xx-xxx-002</span>
              <span className="text-xs text-amber-600">與「教育展名單 #214」重複</span>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
              <span className="text-ink">高于婷 · 09xx-xxx-016</span>
              <span className="text-xs text-amber-600">與「官網表單 #178」重複</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-ink-muted">
            正式系統中可一鍵合併名單或忽略告警,此處為 Demo 示意。
          </p>
        </div>
      </DemoModal>
    </PageContainer>
  );
}

function KpiFront({
  label,
  value,
  hint,
  delta,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  delta?: { value: string; positive?: boolean };
  icon: LucideIcon;
}) {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-ink-muted">{label}</span>
        <Icon className="h-4 w-4 text-slate-400" />
      </div>
      <div className="mt-2 text-2xl font-bold tabular text-crm-ink">{value}</div>
      <div className="mt-1 flex items-center gap-2">
        {delta && (
          <span
            className={`rounded px-1.5 py-0.5 text-xs font-semibold ${
              delta.positive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
            }`}
          >
            {delta.value}
          </span>
        )}
        <span className="text-xs text-ink-muted">{hint}</span>
      </div>
    </Card>
  );
}

function KpiBack({ title, lines }: { title: string; lines: string[] }) {
  return (
    <Card className="h-full bg-crm-soft/60">
      <div className="text-xs font-semibold uppercase tracking-wide text-crm">
        {title}
      </div>
      <ul className="mt-2 space-y-1.5">
        {lines.map((l) => (
          <li key={l} className="text-sm text-ink-soft">
            {l}
          </li>
        ))}
      </ul>
    </Card>
  );
}
