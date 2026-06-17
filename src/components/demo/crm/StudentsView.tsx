"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Users, ChevronRight } from "lucide-react";

import {
  PageContainer,
  PageTitle,
  Card,
  Pill,
  Tabs,
  TopbarButton,
} from "@/components/demo/primitives";
import { DemoToast } from "@/components/demo/widgets";
import {
  STUDENTS,
  STATUS_META,
  formatTarget,
  isUnassignedBackend,
  type StudentRow,
} from "@/data/demo/crm";

const PAGE_SIZE = 8;

type TabKey = "all" | "recruitment" | "application" | "unassigned";

export function StudentsView({
  initialTab = "all",
  onOpenStudent,
}: {
  initialTab?: TabKey;
  onOpenStudent: (id: string) => void;
}) {
  const [tab, setTab] = useState<TabKey>(initialTab);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const fireToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const counts = useMemo(
    () => ({
      recruitment: STUDENTS.filter(
        (s) => STATUS_META[s.statusCode]?.category === "recruitment"
      ).length,
      application: STUDENTS.filter(
        (s) => STATUS_META[s.statusCode]?.category === "application"
      ).length,
      unassigned: STUDENTS.filter(isUnassignedBackend).length,
    }),
    []
  );

  const filtered = useMemo(() => {
    return STUDENTS.filter((s) => {
      if (tab === "recruitment" && STATUS_META[s.statusCode]?.category !== "recruitment")
        return false;
      if (tab === "application" && STATUS_META[s.statusCode]?.category !== "application")
        return false;
      if (tab === "unassigned" && !isUnassignedBackend(s)) return false;
      if (statusFilter && s.statusCode !== statusFilter) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        if (
          !s.fullName.toLowerCase().includes(q) &&
          !s.englishName.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [tab, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const resetPage = () => setPage(1);

  return (
    <PageContainer>
      <PageTitle
        icon={Users}
        title="學生專案管理"
        subtitle={`${filtered.length} 位學生${
          tab !== "all" || query || statusFilter ? " · 已套用篩選" : ""
        }`}
        right={
          <TopbarButton
            icon={Plus}
            primary
            primaryClass="bg-crm hover:bg-crm-ink"
            onClick={() => fireToast("新增學生表單為 Demo 示意，正式系統可建立名單")}
          >
            新增學生
          </TopbarButton>
        }
      />

      <div className="mb-4">
        <Tabs
          accentClass="border-crm text-crm"
          value={tab}
          onChange={(k) => {
            setTab(k as TabKey);
            resetPage();
          }}
          items={[
            { key: "all", label: "全部" },
            { key: "recruitment", label: "招生中", badge: counts.recruitment },
            { key: "application", label: "申請中", badge: counts.application },
            { key: "unassigned", label: "待分配後端", badge: counts.unassigned },
          ]}
        />
      </div>

      {/* 搜尋 + 狀態下拉 */}
      <Card className="mb-4" padded={false}>
        <div className="flex flex-wrap items-center gap-3 p-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetPage();
              }}
              placeholder="中 / 英文姓名"
              className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-ink outline-none focus:border-crm focus:ring-2 focus:ring-crm/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              resetPage();
            }}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-ink-soft outline-none focus:border-crm focus:ring-2 focus:ring-crm/20"
          >
            <option value="">全部狀態</option>
            {Object.values(STATUS_META).map((m) => (
              <option key={m.code} value={m.code}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* 表格 */}
      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                <th className="px-4 py-3">姓名</th>
                <th className="px-4 py-3">狀態</th>
                <th className="px-4 py-3">前端顧問</th>
                <th className="px-4 py-3">後端顧問</th>
                <th className="px-4 py-3">目標</th>
                <th className="px-4 py-3 text-right">建立時間</th>
                <th className="px-2 py-3" />
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-sm text-ink-muted"
                  >
                    目前的篩選沒有結果
                  </td>
                </tr>
              ) : (
                pageRows.map((s) => <Row key={s.id} s={s} onOpen={onOpenStudent} />)
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 分頁器 */}
      {totalPages > 1 && (
        <nav className="mt-4 flex items-center justify-between text-sm">
          <span className="text-ink-muted">
            第 {safePage} 頁，共 {totalPages} 頁
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-ink-soft transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              上一頁
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-ink-soft transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              下一頁
            </button>
          </div>
        </nav>
      )}

      <DemoToast message={toast} accentClass="bg-crm" />
    </PageContainer>
  );
}

function Row({ s, onOpen }: { s: StudentRow; onOpen: (id: string) => void }) {
  const status = STATUS_META[s.statusCode];
  return (
    <tr
      onClick={() => onOpen(s.id)}
      className="cursor-pointer border-b border-slate-100 transition-colors last:border-0 hover:bg-crm-soft/40"
    >
      <td className="px-4 py-3">
        <span className="font-bold text-ink">{s.fullName}</span>
        <span className="ml-2 text-xs font-normal text-ink-muted">
          {s.englishName}
        </span>
      </td>
      <td className="px-4 py-3">
        <Pill color={status?.color ?? "slate"}>{status?.label ?? "—"}</Pill>
      </td>
      <td className="px-4 py-3 text-ink-soft">{s.frontend ?? "—"}</td>
      <td className="px-4 py-3 text-ink-soft">
        {s.backend ?? <span className="text-amber-600">待分配</span>}
      </td>
      <td className="px-4 py-3 text-ink-muted">{formatTarget(s)}</td>
      <td className="px-4 py-3 text-right text-xs text-ink-muted">{s.createdAt}</td>
      <td className="px-2 py-3 text-slate-300">
        <ChevronRight className="h-4 w-4" />
      </td>
    </tr>
  );
}
