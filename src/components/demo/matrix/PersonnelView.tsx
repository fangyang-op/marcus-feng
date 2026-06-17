"use client";

import { useMemo, useState } from "react";
import { Settings, UserPlus, Building2, MapPin, Users } from "lucide-react";
import { PageContainer, Card, PageTitle, Pill } from "@/components/demo/primitives";
import { DemoModal, DemoToast } from "@/components/demo/widgets";
import { type YearData } from "@/data/demo/matrix";

type Status = "active" | "inactive" | "on_leave";

const STATUS_LABEL: Record<Status, string> = {
  active: "在職",
  inactive: "離職",
  on_leave: "留停",
};

const REGION_META: Record<string, { sub: string }> = {
  北一區: { sub: "北部一區" },
  桃竹區: { sub: "桃園新竹" },
  中一區: { sub: "中部一區" },
  南一區: { sub: "南部一區" },
};

const REGIONS = ["北一區", "桃竹區", "中一區", "南一區"];

export function PersonnelView({ data }: { data: YearData }) {
  // 本地可切換狀態(示意,不持久化)
  const [overrides, setOverrides] = useState<Record<string, Status>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  };

  const statusOf = (name: string, base: Status): Status => overrides[name] ?? base;
  const cycle = (name: string, current: Status) => {
    const next: Status = current === "active" ? "on_leave" : current === "on_leave" ? "inactive" : "active";
    setOverrides((prev) => ({ ...prev, [name]: next }));
    showToast(`${name} 已更新為「${STATUS_LABEL[next]}」(Demo 示意)`);
  };

  // 各區人數 / 在職率(含本地 override)
  const regionSummary = useMemo(() => {
    return REGIONS.map((region) => {
      const members = data.consultants.filter((c) => c.region === region);
      const active = members.filter((m) => statusOf(m.name, m.status) === "active").length;
      const onLeave = members.filter((m) => statusOf(m.name, m.status) === "on_leave").length;
      const inactive = members.filter((m) => statusOf(m.name, m.status) === "inactive").length;
      const rate = members.length > 0 ? (active / members.length) * 100 : 0;
      return { region, total: members.length, active, onLeave, inactive, rate };
    });
    // overrides 影響 active 計數,需作為依賴
  }, [data.consultants, overrides]);

  const totalHead = data.consultants.length;
  const totalActive = regionSummary.reduce((a, r) => a + r.active, 0);

  return (
    <PageContainer className="space-y-6">
      <PageTitle
        icon={Settings}
        title="人員編制設定"
        subtitle={`四區共 ${totalHead} 位顧問編制與在職狀態管理(點擊 chip 切換在職/留停/離職,即時提示)`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {regionSummary.map((rs) => {
          const members = data.consultants.filter((c) => c.region === rs.region);
          return (
            <Card key={rs.region}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-matrix-rose to-matrix-orange text-white">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">{rs.region}</h3>
                    <p className="text-xs text-ink-muted">{REGION_META[rs.region]?.sub}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-ink-soft">{rs.total} 位編制</p>
                  <p className="text-xs text-emerald-600">
                    在職 {rs.active} · 在職率 {rs.rate.toFixed(0)}%
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {members.map((m) => {
                  const s = statusOf(m.name, m.status);
                  const color = s === "active" ? "emerald" : s === "on_leave" ? "amber" : "slate";
                  return (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => cycle(m.name, s)}
                      className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2 text-left transition-colors hover:border-matrix-rose/40 hover:bg-rose-50/40"
                      title="點擊切換狀態(在職 → 留停 → 離職)"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-ink">{m.name}</span>
                        <Pill color={color}>{STATUS_LABEL[s]}</Pill>
                      </span>
                      <span className="text-xs text-ink-muted">到職 {m.hireDate}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {/* 各區人數 / 在職率小總表 */}
      <Card padded={false} className="overflow-hidden">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3">
          <Users className="h-4 w-4 text-matrix-rose" />
          <h3 className="text-sm font-bold text-ink">各區編制總覽</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs text-ink-muted">
                <th className="px-5 py-2.5 font-medium">區域</th>
                <th className="px-3 py-2.5 text-center font-medium">編制人數</th>
                <th className="px-3 py-2.5 text-center font-medium">在職</th>
                <th className="px-3 py-2.5 text-center font-medium">留停</th>
                <th className="px-3 py-2.5 text-center font-medium">離職</th>
                <th className="px-5 py-2.5 text-right font-medium">在職率</th>
              </tr>
            </thead>
            <tbody>
              {regionSummary.map((rs) => (
                <tr key={rs.region} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-2.5 font-semibold text-ink">{rs.region}</td>
                  <td className="px-3 py-2.5 text-center text-ink-soft">{rs.total}</td>
                  <td className="px-3 py-2.5 text-center font-semibold text-emerald-600">{rs.active}</td>
                  <td className="px-3 py-2.5 text-center text-amber-600">{rs.onLeave}</td>
                  <td className="px-3 py-2.5 text-center text-slate-400">{rs.inactive}</td>
                  <td className="px-5 py-2.5 text-right">
                    <span className="inline-flex items-center gap-2">
                      <span className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 sm:block">
                        <span
                          className="block h-full rounded-full bg-gradient-to-r from-matrix-orange to-matrix-rose"
                          style={{ width: `${rs.rate}%` }}
                        />
                      </span>
                      <span className="font-bold text-matrix-rose">{rs.rate.toFixed(0)}%</span>
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50/70 font-semibold">
                <td className="px-5 py-2.5 text-ink">全公司</td>
                <td className="px-3 py-2.5 text-center text-ink">{totalHead}</td>
                <td className="px-3 py-2.5 text-center text-emerald-600">{totalActive}</td>
                <td className="px-3 py-2.5 text-center text-amber-600">
                  {regionSummary.reduce((a, r) => a + r.onLeave, 0)}
                </td>
                <td className="px-3 py-2.5 text-center text-slate-400">
                  {regionSummary.reduce((a, r) => a + r.inactive, 0)}
                </td>
                <td className="px-5 py-2.5 text-right text-matrix-rose">
                  {totalHead > 0 ? ((totalActive / totalHead) * 100).toFixed(0) : 0}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group flex w-full items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-5 text-left transition-colors hover:border-matrix-rose hover:bg-rose-50/50"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-ink-muted shadow-sm group-hover:text-matrix-rose">
          <UserPlus className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink-soft group-hover:text-matrix-rose">
            新增顧問 / 調整區域編制
          </p>
          <p className="text-xs text-ink-muted">
            點擊查看編制寫入流程(新增、轉調、年度編制)— Demo 示意
          </p>
        </div>
      </button>

      <DemoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="新增顧問 / 編制寫入"
        accentClass="bg-matrix-rose"
      >
        <div className="space-y-3">
          <p>
            正式系統中,此處可新增顧問、設定所屬區域、調整年度編制與績效目標,並即時同步至各報表。
          </p>
          <ul className="space-y-1.5 text-[13px]">
            <li className="flex items-center gap-2">
              <UserPlus className="h-3.5 w-3.5 text-matrix-rose" /> 新增 / 停用顧問帳號與所屬區域
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-matrix-rose" /> 跨區轉調與名單重新分配
            </li>
            <li className="flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5 text-matrix-rose" /> 設定各區年度營收目標與編制員額
            </li>
          </ul>
          <p className="text-xs text-ink-muted">
            為作品集展示,此 Demo 不寫入後端;上方狀態 chip 可實際點擊切換以體驗互動。
          </p>
        </div>
      </DemoModal>

      <DemoToast message={toast} accentClass="bg-matrix-rose" />
    </PageContainer>
  );
}
