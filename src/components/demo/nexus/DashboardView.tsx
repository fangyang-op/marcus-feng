"use client";

import {
  ArrowRight,
  Clock,
  Bell,
  BookOpen,
  BadgeCheck,
  AlertTriangle,
  Building2,
  Sparkles,
} from "lucide-react";
import { PageContainer, StatCard, Pill } from "@/components/demo/primitives";
import {
  UPCOMING_ACTIVITIES,
  DASHBOARD_STATS,
  RECENT_FEED,
} from "@/data/demo/nexus";

const STAT_ICON = {
  announcements: Bell,
  issues: AlertTriangle,
  schools: Building2,
  wiki: BookOpen,
} as const;

const STAT_ACCENT = {
  announcements: "text-blue-600",
  issues: "text-amber-600",
  schools: "text-nexus-pink",
  wiki: "text-orange-500",
} as const;

export function DashboardView() {
  const [primary, ...rest] = UPCOMING_ACTIVITIES;

  return (
    <PageContainer>
      {/* 時段問候 (時段固定為示意，避免讀取系統時間造成 hydration 不一致) */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-ink">
          午安，歡迎回到{" "}
          <span className="bg-gradient-to-r from-nexus-pink to-nexus-purple bg-clip-text text-transparent">
            Nexus
          </span>
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          您的全方位留學顧問中控台。今天有什麼需要幫忙的嗎？
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 左欄:即將到來的活動 */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-5 w-1.5 rounded-full bg-nexus-pink" />
            <h3 className="text-base font-bold text-ink">即將到來的活動</h3>
          </div>

          {/* 漸層大卡 */}
          <div className="relative mb-4 flex h-[240px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-nexus-pink to-nexus-purple p-6 text-white shadow-lg">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
            <div className="relative z-10">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                即將到來 Upcoming
              </span>
              <h4 className="mt-4 text-xl font-bold leading-tight">
                {primary.name}
              </h4>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/90">
                <span>{primary.date}</span>
                <span className="h-1 w-1 rounded-full bg-white/60" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {primary.time}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/60" />
                <span>{primary.location}</span>
              </div>
            </div>
            <button
              type="button"
              className="relative z-10 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-nexus-pink shadow-sm transition-colors hover:bg-rose-50"
            >
              查看詳情 <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* 次要活動 */}
          <div className="space-y-2.5">
            {rest.map((a) => (
              <button
                type="button"
                key={a.id}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-ink-muted">
                    {a.date} · {a.time}
                  </div>
                  <div className="mt-0.5 truncate font-semibold text-ink">
                    {a.name}
                  </div>
                </div>
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-nexus-pink/10 text-nexus-pink">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 右欄:4 張 StatCard */}
        <div>
          <div className="mb-3 hidden items-center gap-2 lg:flex">
            <span className="h-5 w-1.5 rounded-full bg-transparent" />
            <h3 className="text-base font-bold text-transparent">_</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DASHBOARD_STATS.map((s) => (
              <StatCard
                key={s.key}
                label={s.label}
                value={
                  <>
                    {s.value}
                    <span className="ml-1 text-xs font-bold text-ink-muted">
                      {s.unit}
                    </span>
                  </>
                }
                hint={s.hint}
                icon={STAT_ICON[s.key as keyof typeof STAT_ICON]}
                accentClass={STAT_ACCENT[s.key as keyof typeof STAT_ACCENT]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 最新公告與動態 */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-[18px] w-[18px] text-ink-muted" />
          <h3 className="text-base font-bold text-ink">最新公告與動態</h3>
        </div>
        <div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {RECENT_FEED.map((item) => {
            const Icon = item.type === "WIKI" ? BookOpen : Bell;
            return (
              <button
                type="button"
                key={item.id}
                className="group flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-rose-50/40"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <span
                    className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl ${
                      item.type === "WIKI"
                        ? "bg-orange-50 text-orange-500"
                        : "bg-blue-50 text-blue-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="flex items-center gap-1.5 truncate font-bold text-ink group-hover:text-nexus-pink">
                      {item.title}
                      {item.isVerified && (
                        <BadgeCheck className="h-4 w-4 flex-none text-blue-500" />
                      )}
                    </h4>
                    <p className="mt-1 line-clamp-1 text-xs text-ink-muted">
                      {item.preview}
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-3">
                  <Pill color={item.type === "WIKI" ? "orange" : "blue"}>
                    {item.type === "WIKI" ? "知識庫" : "最新公告"}
                  </Pill>
                  <span className="hidden w-20 text-right text-xs font-semibold tabular-nums text-ink-muted sm:block">
                    {item.date}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-nexus-pink/20 bg-nexus-pink/5 px-4 py-3 text-sm text-ink-soft">
        <Sparkles className="h-4 w-4 flex-none text-nexus-pink" />
        提示:右下角的 AI 助理可協助查歷屆榜單、推薦選校與查詢申請門檻。
      </div>
    </PageContainer>
  );
}
