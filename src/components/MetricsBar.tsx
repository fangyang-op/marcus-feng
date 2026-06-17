"use client";

import { Section, SectionHeading } from "./ui/Section";
import { CountUp } from "./ui/CountUp";
import { metrics } from "@/data/metrics";
import { ui } from "@/data/ui";
import { useLocale } from "@/i18n";

/** 核心成果條:4 個數字卡片(中英切換) */
export function MetricsBar() {
  const { t } = useLocale();
  return (
    <Section id="metrics" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow={ui.metrics.eyebrow}
        title={t(ui.metrics.title)}
        description={t(ui.metrics.description)}
      />
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.value}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <CountUp
              value={m.value}
              className="tabular block text-3xl font-extrabold tracking-tight text-brand-700 sm:text-4xl"
            />
            <div className="mt-2 text-sm font-semibold text-ink">{t(m.label)}</div>
            <div className="mt-1 text-xs leading-relaxed text-ink-muted">
              {t(m.detail)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
