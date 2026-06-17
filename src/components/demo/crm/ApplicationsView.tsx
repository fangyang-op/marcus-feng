"use client";

import { useState } from "react";
import {
  KanbanSquare,
  LayoutGrid,
  Table2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  X,
} from "lucide-react";

import {
  PageContainer,
  PageTitle,
  Card,
  Pill,
} from "@/components/demo/primitives";
import { DemoToast } from "@/components/demo/widgets";
import {
  APPLICATIONS,
  APP_STATUS_ORDER,
  APP_STATUS_META,
  isOverdue,
  type ApplicationCard,
  type ApplicationStatusCode,
} from "@/data/demo/crm";

export function ApplicationsView() {
  const [mode, setMode] = useState<"board" | "table">("board");
  /** 本地複製一份，讓卡片可在欄位間移動，不影響原始常數 */
  const [apps, setApps] = useState<ApplicationCard[]>(() =>
    APPLICATIONS.map((a) => ({ ...a }))
  );
  /** 目前展開狀態選單的卡片 id */
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fireToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const moveTo = (id: string, code: ApplicationStatusCode) => {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, statusCode: code } : a))
    );
    setMenuFor(null);
    fireToast(`已更新為「${APP_STATUS_META[code].label}」`);
  };

  const advance = (app: ApplicationCard) => {
    const i = APP_STATUS_ORDER.indexOf(app.statusCode);
    const next = APP_STATUS_ORDER[Math.min(i + 1, APP_STATUS_ORDER.length - 1)];
    if (next === app.statusCode) {
      fireToast("已是最後一個狀態");
      return;
    }
    moveTo(app.id, next);
  };

  const dirty =
    JSON.stringify(apps.map((a) => a.statusCode)) !==
    JSON.stringify(APPLICATIONS.map((a) => a.statusCode));

  const reset = () => {
    setApps(APPLICATIONS.map((a) => ({ ...a })));
    setMenuFor(null);
    fireToast("已還原為初始狀態");
  };

  return (
    <PageContainer>
      <PageTitle
        icon={KanbanSquare}
        title="申請進度看板"
        subtitle={`${apps.length} 筆申請 · 跨學生追蹤 · 點卡片可切換狀態`}
        right={
          <div className="flex items-center gap-2">
            {dirty && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" /> 還原
              </button>
            )}
            <div className="flex rounded-lg border border-slate-300 bg-white p-0.5">
              <ToggleBtn
                active={mode === "board"}
                onClick={() => setMode("board")}
                icon={<LayoutGrid className="h-4 w-4" />}
                label="看板"
              />
              <ToggleBtn
                active={mode === "table"}
                onClick={() => setMode("table")}
                icon={<Table2 className="h-4 w-4" />}
                label="表格"
              />
            </div>
          </div>
        }
      />

      {mode === "board" ? (
        <Board
          apps={apps}
          menuFor={menuFor}
          setMenuFor={setMenuFor}
          onMove={moveTo}
          onAdvance={advance}
        />
      ) : (
        <TableView apps={apps} />
      )}

      <DemoToast message={toast} accentClass="bg-crm" />
    </PageContainer>
  );
}

function ToggleBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
        active ? "bg-crm text-white" : "text-ink-soft hover:bg-slate-50"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

/* ── 看板 ─────────────────────────────────────────────────── */
function Board({
  apps,
  menuFor,
  setMenuFor,
  onMove,
  onAdvance,
}: {
  apps: ApplicationCard[];
  menuFor: string | null;
  setMenuFor: (id: string | null) => void;
  onMove: (id: string, code: ApplicationStatusCode) => void;
  onAdvance: (app: ApplicationCard) => void;
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
      <div className="flex gap-3" style={{ minWidth: "max-content" }}>
        {APP_STATUS_ORDER.map((code) => {
          const meta = APP_STATUS_META[code];
          const cards = apps.filter((a) => a.statusCode === code);
          return (
            <div key={code} className="flex w-64 shrink-0 flex-col">
              <div
                className={`flex items-center justify-between rounded-t-lg px-3 py-2 text-sm font-semibold ${meta.headClass}`}
              >
                <span>{meta.label}</span>
                <span className="rounded-full bg-white/40 px-2 text-xs tabular">
                  {cards.length}
                </span>
              </div>
              <div className="flex-1 space-y-2 rounded-b-lg border border-t-0 border-slate-200 bg-slate-50/60 p-2">
                {cards.length === 0 ? (
                  <p className="py-6 text-center text-xs text-ink-muted">
                    拖入或切換卡片至此
                  </p>
                ) : (
                  cards.map((a) => (
                    <KanbanCard
                      key={a.id}
                      app={a}
                      menuOpen={menuFor === a.id}
                      onToggleMenu={() =>
                        setMenuFor(menuFor === a.id ? null : a.id)
                      }
                      onMove={onMove}
                      onAdvance={() => onAdvance(a)}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KanbanCard({
  app,
  menuOpen,
  onToggleMenu,
  onMove,
  onAdvance,
}: {
  app: ApplicationCard;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onMove: (id: string, code: ApplicationStatusCode) => void;
  onAdvance: () => void;
}) {
  const overdue = isOverdue(app);
  return (
    <div className="relative rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={onToggleMenu}
        className="block w-full text-left"
        title="點擊切換狀態"
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-semibold text-ink">{app.school}</span>
          <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-ink-muted">
            {app.round}
          </span>
        </div>
        <div className="mt-0.5 text-xs text-ink-muted">{app.program}</div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-ink-soft">{app.studentName}</span>
          <span className="text-ink-muted">{app.country}</span>
        </div>
        <div
          className={`mt-1.5 flex items-center gap-1 text-xs ${
            overdue ? "font-semibold text-rose-600" : "text-ink-muted"
          }`}
        >
          {overdue && <AlertCircle className="h-3 w-3" />}
          截止 {app.deadline}
        </div>
      </button>

      {/* 快速推進下一階段 */}
      <button
        type="button"
        onClick={onAdvance}
        className="mt-2 flex w-full items-center justify-center gap-1 rounded-md border border-slate-200 py-1 text-[11px] font-medium text-ink-soft transition-colors hover:border-crm hover:text-crm"
      >
        推進下一階段 <ArrowRight className="h-3 w-3" />
      </button>

      {/* 狀態選單 */}
      {menuOpen && (
        <div className="absolute left-2 right-2 top-2 z-20 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
          <div className="mb-1.5 flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold text-ink-muted">
              切換狀態
            </span>
            <button
              type="button"
              onClick={onToggleMenu}
              className="rounded p-0.5 text-ink-muted hover:bg-slate-100"
              aria-label="關閉"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {APP_STATUS_ORDER.map((code) => {
              const m = APP_STATUS_META[code];
              const active = code === app.statusCode;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => onMove(app.id, code)}
                  className={`flex items-center gap-2 rounded-md px-2 py-1 text-left text-xs transition-colors ${
                    active
                      ? "bg-crm-soft text-crm-ink"
                      : "text-ink-soft hover:bg-slate-50"
                  }`}
                >
                  <Pill color={m.pill}>{m.label}</Pill>
                  {active && (
                    <span className="ml-auto text-[10px] text-crm">目前</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── 表格 ─────────────────────────────────────────────────── */
function TableView({ apps }: { apps: ApplicationCard[] }) {
  return (
    <Card padded={false}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3">學生</th>
              <th className="px-4 py-3">學校</th>
              <th className="px-4 py-3">科系</th>
              <th className="px-4 py-3">國家</th>
              <th className="px-4 py-3">輪次</th>
              <th className="px-4 py-3">截止日</th>
              <th className="px-4 py-3">狀態</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => {
              const meta = APP_STATUS_META[a.statusCode];
              const overdue = isOverdue(a);
              return (
                <tr
                  key={a.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-crm-soft/40"
                >
                  <td className="px-4 py-3 text-ink-soft">{a.studentName}</td>
                  <td className="px-4 py-3 font-medium text-ink">{a.school}</td>
                  <td className="px-4 py-3 text-ink-muted">{a.program}</td>
                  <td className="px-4 py-3 text-ink-soft">{a.country}</td>
                  <td className="px-4 py-3 text-ink-soft">{a.round}</td>
                  <td
                    className={`px-4 py-3 ${
                      overdue ? "font-semibold text-rose-600" : "text-ink-muted"
                    }`}
                  >
                    {a.deadline}
                  </td>
                  <td className="px-4 py-3">
                    <Pill color={meta.pill}>{meta.label}</Pill>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
