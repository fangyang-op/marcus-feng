"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Menu, X, type LucideIcon } from "lucide-react";

/**
 * ── 三個 Demo 共用的外殼 ──────────────────────────────────────
 * 提供：頂部紅色「Demo 環境」橫幅 + 左側欄（可分組、行動版抽屜） + 頂欄 + 主內容捲動區
 * + 選用的右下角浮動元件（AI 助理）。
 *
 * 每個 Demo 自己持有「目前在看哪個 view」的 state，透過 activeKey/onSelect 控制側欄。
 * accent 控制品牌色（crm 粉 / nexus 粉紫 / matrix 玫紅）,darkSidebar 給 Matrix 用深色側欄。
 */

export type DemoAccent = "crm" | "nexus" | "matrix";

export interface DemoNavItem {
  key: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
  /** 選用：分組標題（同組連續項目共用第一個出現的 group 當區隔線標題） */
  group?: string;
}

interface ThemeTokens {
  /** 品牌方塊 / active 強調 */
  brand: string;
  brandText: string;
  /** 淺色側欄 active 底色 / 文字 */
  activeBg: string;
  activeText: string;
  activeBar: string;
  /** 頂部橫幅底色 */
  bannerBg: string;
}

const THEME: Record<DemoAccent, ThemeTokens> = {
  crm: {
    brand: "bg-crm",
    brandText: "text-crm",
    activeBg: "bg-crm-soft",
    activeText: "text-crm-ink",
    activeBar: "bg-crm",
    bannerBg: "bg-crm",
  },
  nexus: {
    brand: "bg-gradient-to-br from-nexus-pink to-nexus-purple",
    brandText: "text-nexus-pink",
    activeBg: "bg-nexus-pink/10",
    activeText: "text-nexus-pink",
    activeBar: "bg-nexus-pink",
    bannerBg: "bg-gradient-to-r from-nexus-pink to-nexus-purple",
  },
  matrix: {
    brand: "bg-gradient-to-br from-matrix-rose to-matrix-orange",
    brandText: "text-matrix-rose",
    activeBg: "bg-matrix-rose",
    activeText: "text-white",
    activeBar: "bg-matrix-orange",
    bannerBg: "bg-matrix-rose",
  },
};

export interface DemoShellProps {
  accent: DemoAccent;
  /** 側欄品牌名 */
  brandName: string;
  /** 側欄品牌副標 */
  brandSub?: string;
  /** 品牌方塊內縮寫 */
  brandMark: string;
  nav: DemoNavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  /** 頂欄標題（通常 = 目前 view 名稱） */
  title: ReactNode;
  /** 頂欄右側自訂操作區（年度切換、avatar 等） */
  topbarRight?: ReactNode;
  /** 深色側欄（Matrix） */
  darkSidebar?: boolean;
  /** 右下角浮動元件（AI 助理） */
  floating?: ReactNode;
  children: ReactNode;
}

export function DemoShell({
  accent,
  brandName,
  brandSub,
  brandMark,
  nav,
  activeKey,
  onSelect,
  title,
  topbarRight,
  darkSidebar = false,
  floating,
  children,
}: DemoShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = THEME[accent];

  const sidebar = (
    <div
      className={`flex h-full w-64 flex-col border-r ${
        darkSidebar
          ? "border-slate-800 bg-slate-900 text-slate-300"
          : "border-slate-200 bg-white text-ink-soft"
      }`}
    >
      {/* 品牌 */}
      <div
        className={`flex h-14 shrink-0 items-center gap-2.5 px-4 ${
          darkSidebar ? "border-b border-slate-800" : "border-b border-slate-100"
        }`}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white ${t.brand}`}
        >
          {brandMark}
        </span>
        <div className="min-w-0">
          <div
            className={`truncate text-[13px] font-bold ${
              darkSidebar ? "text-white" : "text-ink"
            }`}
          >
            {brandName}
          </div>
          {brandSub && (
            <div className="truncate text-[11px] text-ink-muted">{brandSub}</div>
          )}
        </div>
      </div>

      {/* 導覽 */}
      <nav className="scrollbar-thin flex-1 space-y-0.5 overflow-y-auto px-2.5 py-3">
        {nav.map((item, i) => {
          const showGroup = item.group && item.group !== nav[i - 1]?.group;
          const Icon = item.icon;
          const active = item.key === activeKey;
          return (
            <div key={item.key}>
              {showGroup && (
                <p
                  className={`px-2.5 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider ${
                    darkSidebar ? "text-slate-500" : "text-ink-muted"
                  }`}
                >
                  {item.group}
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  onSelect(item.key);
                  setMobileOpen(false);
                }}
                className={`relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors ${
                  active
                    ? `${t.activeBg} ${t.activeText}`
                    : darkSidebar
                      ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                      : "text-ink-soft hover:bg-slate-100 hover:text-ink"
                }`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge != null && (
                  <span
                    className={`ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      active
                        ? "bg-white/25 text-current"
                        : "bg-rose-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </nav>

      {/* 底部：返回作品集 */}
      <div
        className={`shrink-0 p-2.5 ${
          darkSidebar ? "border-t border-slate-800" : "border-t border-slate-100"
        }`}
      >
        <Link
          href="/"
          className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
            darkSidebar
              ? "text-slate-400 hover:bg-slate-800 hover:text-white"
              : "text-ink-muted hover:bg-slate-100 hover:text-ink"
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          返回作品集
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">
      {/* Demo 提示橫幅 */}
      <div
        className={`flex h-9 shrink-0 items-center justify-center gap-2 px-4 text-center text-[12px] font-semibold text-white ${t.bannerBg}`}
      >
        <span className="flex h-1.5 w-1.5 rounded-full bg-white/90" />
        Demo 環境 · 所有資料為示意，非真實營運數據
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 桌機側欄 */}
        <aside className="hidden shrink-0 md:block">{sidebar}</aside>

        {/* 行動版抽屜 */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full">{sidebar}</div>
          </div>
        )}

        {/* 主區 */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* 頂欄 */}
          <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-md p-1.5 text-ink-soft hover:bg-slate-100 md:hidden"
              aria-label="開啟選單"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="truncate text-base font-semibold text-ink">{title}</h1>
            <div className="ml-auto flex items-center gap-2">{topbarRight}</div>
          </header>

          {/* 內容捲動區 */}
          <main className="scrollbar-thin flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>

      {floating}
    </div>
  );
}
