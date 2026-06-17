"use client";

import { useState } from "react";
import { KanbanSquare, LayoutGrid, Table2, AlertCircle } from "lucide-react";

import {
  PageContainer,
  PageTitle,
  Card,
  Pill,
} from "@/components/demo/primitives";
import {
  APPLICATIONS,
  APP_STATUS_ORDER,
  APP_STATUS_META,
  isOverdue,
  type ApplicationCard,
} from "@/data/demo/crm";

export function ApplicationsView() {
  const [mode, setMode] = useState<"board" | "table">("board");

  return (
    <PageContainer>
      <PageTitle
        icon={KanbanSquare}
        title="申請進度看板"
        subtitle={`${APPLICATIONS.length} 筆申請 · 跨學生追蹤`}
        right={
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
        }
      />

      {mode === "board" ? <Board /> : <TableView />}
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
function Board() {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
      <div className="flex gap-3" style={{ minWidth: "max-content" }}>
        {APP_STATUS_ORDER.map((code) => {
          const meta = APP_STATUS_META[code];
          const cards = APPLICATIONS.filter((a) => a.statusCode === code);
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
                  <p className="py-6 text-center text-xs text-ink-muted">—</p>
                ) : (
                  cards.map((a) => <KanbanCard key={a.id} app={a} />)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KanbanCard({ app }: { app: ApplicationCard }) {
  const overdue = isOverdue(app);
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
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
    </div>
  );
}

/* ── 表格 ─────────────────────────────────────────────────── */
function TableView() {
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
            {APPLICATIONS.map((a) => {
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
