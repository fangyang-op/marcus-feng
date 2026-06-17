import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/**
 * ── Demo 共用 UI primitives ───────────────────────────────────
 * 三個 Demo(CRM / Nexus / Matrix)共用的視覺零件,確保風格一致。
 * 都是純展示元件,可直接在各 Demo 的 client 頁面內使用。
 */

/** 內容容器:統一頁面內距與最大寬度 */
export function PageContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

/** 頁面區段標題 */
export function PageTitle({
  icon: Icon,
  title,
  subtitle,
  right,
}: {
  icon?: LucideIcon;
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-ink-soft" />}
          <h2 className="text-xl font-bold text-ink">{title}</h2>
        </div>
        {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}

/** 白卡 */
export function Card({
  children,
  className = "",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white shadow-sm ${
        padded ? "p-5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** KPI / 統計卡 */
export function StatCard({
  label,
  value,
  hint,
  delta,
  icon: Icon,
  accentClass = "text-ink",
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  delta?: { value: string; positive?: boolean };
  icon?: LucideIcon;
  accentClass?: string;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-ink-muted">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-slate-400" />}
      </div>
      <div className={`mt-2 text-2xl font-bold tabular ${accentClass}`}>{value}</div>
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
        {hint && <span className="text-xs text-ink-muted">{hint}</span>}
      </div>
    </Card>
  );
}

/** 狀態色票 */
export type PillColor =
  | "slate"
  | "blue"
  | "green"
  | "amber"
  | "rose"
  | "violet"
  | "cyan"
  | "indigo"
  | "pink"
  | "teal"
  | "orange"
  | "emerald";

const PILL: Record<PillColor, string> = {
  slate: "bg-slate-100 text-slate-700 border-slate-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-200",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  pink: "bg-pink-50 text-pink-700 border-pink-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

/** 狀態徽章 */
export function Pill({
  children,
  color = "slate",
}: {
  children: ReactNode;
  color?: PillColor;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${PILL[color]}`}
    >
      {children}
    </span>
  );
}

export interface TabItem {
  key: string;
  label: ReactNode;
  badge?: string | number;
}

/** 水平 Tabs(controlled) */
export function Tabs({
  items,
  value,
  onChange,
  accentClass = "border-brand-600 text-brand-700",
}: {
  items: TabItem[];
  value: string;
  onChange: (key: string) => void;
  /** active tab 的 border + text 顏色 class */
  accentClass?: string;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-slate-200">
      {items.map((item) => {
        const active = item.key === value;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={`-mb-px flex shrink-0 items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors ${
              active
                ? accentClass
                : "border-transparent text-ink-muted hover:text-ink-soft"
            }`}
          >
            {item.label}
            {item.badge != null && (
              <span className="rounded-full bg-slate-100 px-1.5 text-[10px] font-bold text-ink-soft">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** 頂欄小按鈕 */
export function TopbarButton({
  icon: Icon,
  children,
  onClick,
  primary = false,
  primaryClass = "bg-brand-700 hover:bg-brand-800",
}: {
  icon?: LucideIcon;
  children?: ReactNode;
  onClick?: () => void;
  primary?: boolean;
  primaryClass?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
        primary
          ? `text-white ${primaryClass}`
          : "border border-slate-300 bg-white text-ink-soft hover:bg-slate-50"
      }`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

/** 簡易進度條 */
export function ProgressBar({
  value,
  max = 100,
  className = "bg-brand-600",
  track = "bg-slate-100",
}: {
  value: number;
  max?: number;
  className?: string;
  track?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full ${track}`}>
      <div
        className={`h-full rounded-full ${className}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
