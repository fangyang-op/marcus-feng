"use client";

import { useState } from "react";
import { Settings, UserPlus, Building2, MapPin } from "lucide-react";
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

  const regions = ["北一區", "桃竹區", "中一區", "南一區"];

  return (
    <PageContainer className="space-y-6">
      <PageTitle
        icon={Settings}
        title="人員編制設定"
        subtitle="四區顧問編制與在職狀態管理(點擊 chip 切換在職/留停/離職,即時提示)"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {regions.map((region) => {
          const members = data.consultants.filter((c) => c.region === region);
          const activeCount = members.filter((m) => statusOf(m.name, m.status) === "active").length;
          return (
            <Card key={region}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-matrix-rose to-matrix-orange text-white">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">{region}</h3>
                    <p className="text-xs text-ink-muted">{REGION_META[region]?.sub}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-ink-soft">{members.length} 位</p>
                  <p className="text-xs text-emerald-600">在職 {activeCount}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {members.map((m) => {
                  const s = statusOf(m.name, m.status);
                  const color = s === "active" ? "emerald" : s === "on_leave" ? "amber" : "slate";
                  return (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => cycle(m.name, s)}
                      className="transition-transform hover:scale-105"
                      title="點擊切換狀態"
                    >
                      <Pill color={color}>
                        {m.name} · {STATUS_LABEL[s]}
                      </Pill>
                    </button>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

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
