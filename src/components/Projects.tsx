"use client";

import { Section, SectionHeading } from "./ui/Section";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";
import { ui } from "@/data/ui";
import { useLocale } from "@/i18n";

/** 精選專案：卡片式，可展開說明，部分可進入 Demo */
export function Projects() {
  const { t } = useLocale();
  return (
    <Section id="projects" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow={ui.projects.eyebrow}
        title={t(ui.projects.title)}
        description={t(ui.projects.description)}
      />
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}
