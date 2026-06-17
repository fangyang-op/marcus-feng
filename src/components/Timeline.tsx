"use client";

import { Section, SectionHeading } from "./ui/Section";
import { timeline } from "@/data/timeline";
import { ui } from "@/data/ui";
import { useLocale } from "@/i18n";

/** 經歷時間軸:精簡、由新到舊(中英切換) */
export function Timeline() {
  const { t } = useLocale();
  return (
    <Section id="timeline" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow={ui.timeline.eyebrow}
        title={t(ui.timeline.title)}
        description={t(ui.timeline.description)}
      />

      <ol className="mt-10 space-y-0">
        {timeline.map((item, i) => (
          <li key={item.org} className="relative flex gap-5 pb-8 last:pb-0">
            {/* 時間軸線 + 點 */}
            <div className="flex flex-col items-center">
              <span
                className={`mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                  item.current
                    ? "border-brand-600 bg-brand-600"
                    : "border-slate-300 bg-white"
                }`}
              />
              {i < timeline.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-slate-200" />
              )}
            </div>

            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-base font-bold text-ink">{item.org}</h3>
                {item.current && (
                  <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">
                    {t(ui.timeline.current)}
                  </span>
                )}
                <span className="ml-auto text-xs font-medium text-ink-muted">
                  {t(item.period)}
                </span>
              </div>
              <p className="mt-0.5 text-sm font-medium text-brand-700">
                {t(item.role)}
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {item.points.map((p) => (
                  <li
                    key={p.zh}
                    className="relative pl-4 text-sm leading-relaxed text-ink-soft before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-slate-300"
                  >
                    {t(p)}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
