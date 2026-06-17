"use client";

import {
  AlertTriangle,
  ArrowRight,
  Lightbulb,
  Users,
  TrendingUp,
  FileCheck,
  Sparkles,
} from "lucide-react";

import {
  PageContainer,
  PageTitle,
  StatCard,
} from "@/components/demo/primitives";
import { DASHBOARD_STATS, STUDENTS, isUnassignedBackend } from "@/data/demo/crm";

const STAT_ICONS = [Users, Sparkles, FileCheck, TrendingUp];

export function DashboardView({ onGoUnassigned }: { onGoUnassigned: () => void }) {
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

        <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm shadow-sm">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
            <span className="text-amber-900">
              有 <strong className="tabular">{dupCount}</strong>{" "}
              筆名單覆蓋了重複手機號碼,請確認
            </span>
          </div>
          <span className="flex shrink-0 items-center gap-1 font-medium text-amber-800">
            查看清單 <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* KPI 卡 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat, i) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            hint={stat.hint}
            delta={stat.delta}
            icon={STAT_ICONS[i]}
            accentClass="text-crm-ink"
          />
        ))}
      </div>
    </PageContainer>
  );
}
