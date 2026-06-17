"use client";

import { useState } from "react";
import { Settings, UserPlus, Building2 } from "lucide-react";
import { PageContainer, Card, PageTitle, Pill } from "@/components/demo/primitives";
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

  const statusOf = (name: string, base: Status): Status => overrides[name] ?? base;
  const cycle = (name: string, current: Status) => {
    const next: Status = current === "active" ? "on_leave" : current === "on_leave" ? "inactive" : "active";
    setOverrides((prev) => ({ ...prev, [name]: next }));
  };

  const regions = ["北一區", "桃竹區", "中一區", "南一區"];

  return (
    <PageContainer className="space-y-6">
      <PageTitle
        icon={Settings}
        title="人員編制設定"
        subtitle="四區顧問編制與在職狀態管理(點擊 chip 可切換狀態,示意)"
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

      <Card className="flex items-center gap-3 border-dashed bg-slate-50/60">
        <UserPlus className="h-5 w-5 text-ink-muted" />
        <p className="text-sm text-ink-muted">
          新增顧問、調整所屬區域與年度編制等寫入操作,於此 Demo 中簡化呈現。
        </p>
      </Card>
    </PageContainer>
  );
}
