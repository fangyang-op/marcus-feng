"use client";

import { useState } from "react";
import { ShieldCheck, RefreshCw, Search } from "lucide-react";
import {
  PageContainer,
  PageTitle,
  Card,
  StatCard,
  Pill,
} from "@/components/demo/primitives";
import { DemoToast } from "@/components/demo/widgets";
import {
  PERMISSION_USERS,
  USER_ROLE_COLOR,
  USER_ROLE_LABEL,
} from "@/data/demo/nexus";

const NEXUS_ACCENT = "bg-nexus-pink";

export function PermissionsView() {
  // 以 id → active 的覆寫表保存切換結果(純前端，不接 API)
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const isActive = (id: string, fallback: boolean) =>
    id in overrides ? overrides[id] : fallback;

  const toggle = (id: string, name: string, current: boolean) => {
    const next = !current;
    setOverrides((prev) => ({ ...prev, [id]: next }));
    showToast(`已將「${name}」設為${next ? "啟用" : "停權"}(Demo 示意)`);
  };

  const q = search.trim().toLowerCase();
  const rows = PERMISSION_USERS.filter(
    (u) =>
      !q ||
      u.name.includes(q) ||
      u.empId.toLowerCase().includes(q) ||
      u.team.includes(q) ||
      USER_ROLE_LABEL[u.role].includes(q),
  );

  const activeCount = PERMISSION_USERS.filter((u) =>
    isActive(u.id, u.active),
  ).length;
  const adminCount = PERMISSION_USERS.filter((u) => u.role === "admin").length;

  return (
    <PageContainer>
      <PageTitle
        icon={ShieldCheck}
        title="權限管理系統"
        subtitle="使用者角色與啟用狀態管理(全為示意假資料)"
        right={
          <button
            type="button"
            onClick={() => showToast("已開始同步使用者名單(Demo 示意)")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-nexus-pink px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-nexus-purple"
          >
            <RefreshCw className="h-4 w-4" />
            同步使用者
          </button>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="使用者總數" value={`${PERMISSION_USERS.length}`} hint="本系統涵蓋" />
        <StatCard label="啟用中" value={`${activeCount}`} hint="可登入" accentClass="text-emerald-600" />
        <StatCard
          label="停權中"
          value={`${PERMISSION_USERS.length - activeCount}`}
          hint="已停用"
          accentClass="text-rose-600"
        />
        <StatCard label="管理員" value={`${adminCount}`} hint="admin 角色" accentClass="text-nexus-pink" />
      </div>

      <div className="relative mb-4 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜尋員工編號、姓名、團隊或角色…"
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-nexus-pink focus:ring-2 focus:ring-nexus-pink/20"
        />
      </div>

      <Card padded={false} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-ink-muted">
                <th className="px-4 py-3">員工編號</th>
                <th className="px-4 py-3">姓名</th>
                <th className="px-4 py-3">角色</th>
                <th className="px-4 py-3">團隊</th>
                <th className="px-4 py-3">最後活躍</th>
                <th className="px-4 py-3">狀態</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((u) => {
                const active = isActive(u.id, u.active);
                return (
                  <tr key={u.id} className="hover:bg-rose-50/30">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-ink-soft">
                      {u.empId}
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink">{u.name}</td>
                    <td className="px-4 py-3">
                      <Pill color={USER_ROLE_COLOR[u.role]}>{USER_ROLE_LABEL[u.role]}</Pill>
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{u.team}</td>
                    <td className="px-4 py-3 font-mono text-xs text-ink-muted">
                      {u.lastActive}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggle(u.id, u.name, active)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                          active
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                        }`}
                        title="點擊切換狀態"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            active ? "bg-emerald-500" : "bg-rose-500"
                          }`}
                        />
                        {active ? "啟用" : "停權"}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-ink-muted">
                    找不到符合條件的使用者。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <DemoToast message={toast} accentClass={NEXUS_ACCENT} />
    </PageContainer>
  );
}
