"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { ProjectShowcase } from "./ProjectShowcase";
import { ProjectModal } from "./ProjectModal";
import { Tag } from "./ui/Tag";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { ui } from "@/data/ui";
import { useLocale } from "@/i18n";
import { ACCENT, tagLabel } from "./projectStyles";

/**
 * 精選專案。
 * - 旗艦(有 Demo:CRM / Nexus / Matrix):選擇列 + 全寬詳情面板(ProjectShowcase)。
 * - 其他作品(無 Demo):精簡卡,點擊開 Modal 看完整說明(不撐破等高 grid)。
 */
export function Projects() {
  const { t } = useLocale();
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const flagship = projects.filter((p) => p.demoHref);
  const supporting = projects.filter((p) => !p.demoHref);

  return (
    <Section id="projects" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow={ui.projects.eyebrow}
        title={t(ui.projects.title)}
        description={t(ui.projects.description)}
      />

      <p className="mt-6 text-sm font-medium text-ink-muted">
        {t(ui.projects.selectHint)}
      </p>

      <div className="mt-4">
        <ProjectShowcase projects={flagship} />
      </div>

      {supporting.length > 0 && (
        <div className="mt-14">
          <h3 className="text-base font-bold text-ink">{t(ui.projects.moreWork)}</h3>
          <p className="mt-1 text-sm text-ink-muted">{t(ui.projects.moreWorkDesc)}</p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {supporting.map((p) => (
              <SupportingCard
                key={p.id}
                project={p}
                onOpen={() => setModalProject(p)}
              />
            ))}
          </div>
        </div>
      )}

      {modalProject && (
        <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
      )}
    </Section>
  );
}

/** 支援型作品:精簡卡,整張可點 → 開 Modal 看細節 */
function SupportingCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const { locale, t } = useLocale();
  const a = ACCENT[project.accent];
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card-hover"
    >
      <span className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${a.bar}`} />
        <span className="text-sm font-bold text-ink">{t(project.name)}</span>
      </span>
      <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {t(project.tagline)}
      </span>
      <span className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tagLabel(tag, locale)}</Tag>
        ))}
      </span>
      <span
        className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${a.text}`}
      >
        {t(ui.projects.viewDetails)}
        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}
