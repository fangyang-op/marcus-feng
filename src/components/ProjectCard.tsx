"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown, Check } from "lucide-react";
import type { Project, AccentKey } from "@/data/types";
import { Tag } from "./ui/Tag";

/**
 * 各專案強調色。class 寫成完整字串，讓 Tailwind JIT 能正確掃描。
 * (對應 tailwind.config.ts 內的 crm / nexus / matrix / brand 色)
 */
const ACCENT: Record<
  AccentKey,
  { bar: string; text: string; btn: string; check: string }
> = {
  crm: {
    bar: "bg-crm",
    text: "text-crm",
    btn: "bg-crm hover:bg-crm-ink",
    check: "text-crm",
  },
  nexus: {
    bar: "bg-nexus-pink",
    text: "text-nexus-pink",
    btn: "bg-nexus-pink hover:bg-nexus-purple",
    check: "text-nexus-pink",
  },
  matrix: {
    bar: "bg-matrix-rose",
    text: "text-matrix-rose",
    btn: "bg-matrix-rose hover:bg-matrix-orange",
    check: "text-matrix-rose",
  },
  brand: {
    bar: "bg-brand-600",
    text: "text-brand-700",
    btn: "bg-brand-700 hover:bg-brand-800",
    check: "text-brand-600",
  },
  slate: {
    bar: "bg-slate-500",
    text: "text-slate-700",
    btn: "bg-slate-700 hover:bg-slate-900",
    check: "text-slate-500",
  },
};

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const a = ACCENT[project.accent];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* 頂部強調色條 */}
      <div className={`h-1 w-full ${a.bar}`} />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-ink">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {project.tagline}
        </p>

        {/* 技術標籤 */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {/* 展開的詳情 */}
        <div
          className={`grid transition-all duration-300 ${
            open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-sm leading-relaxed text-ink-soft">
              {project.description}
            </p>
            <ul className="mt-4 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-ink-soft">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${a.check}`} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 按鈕列 */}
        <div className="mt-6 flex items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-slate-400"
          >
            查看說明
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {project.demoHref && (
            <a
              href={project.demoHref}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-white transition-colors ${a.btn}`}
            >
              進入 Demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
