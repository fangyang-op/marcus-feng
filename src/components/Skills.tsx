"use client";

import { Wrench, Compass } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { toolchain, operations } from "@/data/skills";
import { ui } from "@/data/ui";
import { useLocale } from "@/i18n";
import type { SkillGroup } from "@/data/types";
import type { L } from "@/i18n/types";

function SkillColumn({
  icon,
  title,
  subtitle,
  groups,
  accent,
}: {
  icon: React.ReactNode;
  title: L;
  subtitle: L;
  groups: SkillGroup[];
  accent: string;
}) {
  const { t } = useLocale();
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-base font-bold text-ink">{t(title)}</h3>
          <p className="text-xs text-ink-muted">{t(subtitle)}</p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {groups.map((g) => (
          <div key={g.title.zh}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {t(g.title)}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <span
                  key={item.zh}
                  className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm font-medium text-ink-soft"
                >
                  {t(item)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 能力與技術:左工具鏈、右營運能力 */
export function Skills() {
  const { t } = useLocale();
  return (
    <Section id="skills" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow={ui.skills.eyebrow}
        title={t(ui.skills.title)}
        description={t(ui.skills.description)}
      />
      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SkillColumn
          icon={<Wrench className="h-5 w-5 text-white" />}
          title={ui.skills.toolchainTitle}
          subtitle={ui.skills.toolchainSub}
          groups={toolchain}
          accent="bg-brand-700"
        />
        <SkillColumn
          icon={<Compass className="h-5 w-5 text-white" />}
          title={ui.skills.operationsTitle}
          subtitle={ui.skills.operationsSub}
          groups={operations}
          accent="bg-ink"
        />
      </div>
    </Section>
  );
}
