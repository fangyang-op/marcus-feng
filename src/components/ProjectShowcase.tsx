"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import type { Project } from "@/data/types";
import { ui } from "@/data/ui";
import { useLocale } from "@/i18n";
import { Tag } from "./ui/Tag";
import { ACCENT, tagLabel } from "./projectStyles";

/**
 * 旗艦系統展示:上方 3 顆可點選的卡(選擇列)、下方一塊全寬詳情面板。
 * 一次只展開一個專案的完整說明 → 永遠不會撐破上排、也不會有「鄰卡空一塊」。
 * 三張旗艦統一使用酒紅(crm 色)做主色,只用「亮/灰色條 + ring + 檢視中」區分選中。
 */
const WINE = ACCENT.crm;

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const { locale, t } = useLocale();
  const [activeId, setActiveId] = useState(projects[0]?.id);
  const active = projects.find((p) => p.id === activeId) ?? projects[0];
  if (!active) return null;

  return (
    <div>
      {/* ── 選擇列:3 套旗艦(統一酒紅) ── */}
      <div
        role="tablist"
        aria-label="Flagship systems"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {projects.map((p) => {
          const isActive = p.id === active.id;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(p.id)}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition-all duration-200 ${
                isActive
                  ? `${WINE.soft} shadow-card-hover ring-2 ${WINE.ring}`
                  : "shadow-card hover:-translate-y-0.5 hover:shadow-card-hover"
              }`}
            >
              <span
                className={`h-1.5 w-full ${
                  isActive ? WINE.bar : "bg-slate-200 group-hover:bg-slate-300"
                }`}
              />
              <span className="flex flex-1 flex-col p-5">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-base font-bold text-ink">{t(p.name)}</span>
                  {isActive && (
                    <span
                      className={`inline-flex shrink-0 items-center gap-1 text-xs font-semibold ${WINE.text}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${WINE.bar}`} />
                      {t(ui.projects.viewing)}
                    </span>
                  )}
                </span>
                <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {t(p.tagline)}
                </span>
                {/* 技術標籤 */}
                <span className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <Tag key={tag}>{tagLabel(tag, locale)}</Tag>
                  ))}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* ── 全寬詳情面板:目前選中的旗艦(切換時淡入) ── */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
        <div className={`h-1.5 w-full ${WINE.bar}`} />
        <div key={active.id} className="animate-fade-in p-6 sm:p-8">
          {/* 標題列 + Demo CTA */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold text-ink sm:text-2xl">{t(active.name)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {t(active.tagline)}
              </p>
            </div>
            {active.demoHref && (
              <a
                href={active.demoHref}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors ${WINE.btn}`}
              >
                {t(ui.projects.openDemo)}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* 描述 */}
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-soft">
            {t(active.description)}
          </p>

          {/* 重點:全寬雙欄(長清單也讀得舒服、不會把版面拉歪) */}
          <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 border-t border-slate-100 pt-6 md:grid-cols-2">
            {active.highlights.map((h) => (
              <li key={h.zh} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                <Check className={`mt-0.5 h-4 w-4 shrink-0 ${WINE.check}`} />
                <span>{t(h)}</span>
              </li>
            ))}
          </ul>

          {locale === "en" && active.demoHref && (
            <p className="mt-5 text-xs text-ink-muted">{ui.projects.demoInChinese.en}</p>
          )}
        </div>
      </div>
    </div>
  );
}
