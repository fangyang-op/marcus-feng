"use client";

import { useState } from "react";
import {
  LayoutDashboard, Gauge, UserCog, Network, Share2, Grid3x3, Settings, RefreshCw,
} from "lucide-react";
import { DemoShell, type DemoNavItem } from "@/components/demo/DemoShell";
import { TopbarButton } from "@/components/demo/primitives";
import { DemoToast } from "@/components/demo/widgets";
import { MATRIX_DATA, MATRIX_YEARS, type MatrixYear } from "@/data/demo/matrix";
import { OverviewView } from "@/components/demo/matrix/OverviewView";
import { PerformanceView } from "@/components/demo/matrix/PerformanceView";
import { ConsultantView } from "@/components/demo/matrix/ConsultantView";
import { SourceView } from "@/components/demo/matrix/SourceView";
import { ProductView } from "@/components/demo/matrix/ProductView";
import { PersonnelView } from "@/components/demo/matrix/PersonnelView";
import { OrgView } from "@/components/demo/matrix/OrgView";
import { AIWidget } from "@/components/demo/matrix/AIWidget";

const NAV: DemoNavItem[] = [
  { key: "overview", label: "總覽", icon: LayoutDashboard },
  { key: "performance", label: "即時績效監控", icon: Gauge },
  { key: "consultant", label: "個別顧問分析", icon: UserCog },
  { key: "org", label: "組織人效統計", icon: Network },
  { key: "source", label: "來源績效統計", icon: Share2 },
  { key: "product", label: "產品組成統計", icon: Grid3x3 },
  { key: "personnel", label: "人員編制設定", icon: Settings },
];

const TITLES: Record<string, string> = {
  overview: "總覽 Dashboard",
  performance: "即時績效監控",
  consultant: "個別顧問分析",
  org: "組織人效統計",
  source: "來源績效統計",
  product: "產品組成統計",
  personnel: "人員編制設定",
};

export default function MatrixDemoPage() {
  const [view, setView] = useState("overview");
  const [year, setYear] = useState<MatrixYear>("2026");
  const [toast, setToast] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  const data = MATRIX_DATA[year];

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const handleSync = () => {
    if (syncing) return;
    setSyncing(true);
    showToast(`資料同步完成 · ${year} 年度已更新（Demo 示意）`);
    window.setTimeout(() => setSyncing(false), 900);
  };

  const topbarRight = (
    <div className="flex items-center gap-2">
      {/* 年度切換器 */}
      <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
        {MATRIX_YEARS.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setYear(y)}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-all ${
              year === y ? "bg-white text-ink shadow-sm" : "text-ink-muted hover:text-ink-soft"
            }`}
          >
            {y}
          </button>
        ))}
      </div>
      <TopbarButton
        icon={RefreshCw}
        primary
        primaryClass={`bg-matrix-rose hover:bg-matrix-orange ${syncing ? "opacity-70" : ""}`}
        onClick={handleSync}
      >
        {syncing ? "同步中…" : "同步"}
      </TopbarButton>
    </div>
  );

  return (
    <DemoShell
      accent="matrix"
      brandName="Matrix"
      brandSub="營運數據分析中心"
      brandMark="Mx"
      darkSidebar
      nav={NAV}
      activeKey={view}
      onSelect={setView}
      title={TITLES[view]}
      topbarRight={topbarRight}
      floating={
        <>
          <AIWidget />
          <DemoToast message={toast} accentClass="bg-matrix-rose" />
        </>
      }
    >
      {view === "overview" && <OverviewView data={data} />}
      {view === "performance" && <PerformanceView data={data} year={year} />}
      {view === "consultant" && <ConsultantView data={data} />}
      {view === "org" && <OrgView data={data} year={year} />}
      {view === "source" && <SourceView data={data} year={year} />}
      {view === "product" && <ProductView data={data} />}
      {view === "personnel" && <PersonnelView data={data} />}
    </DemoShell>
  );
}
