"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Check } from "lucide-react";
import type { Project } from "@/data/types";
import { useLocale } from "@/i18n";
import { Tag } from "./ui/Tag";
import { ACCENT, tagLabel } from "./projectStyles";

/**
 * 專案詳情彈窗(給「其他作品」支援型專案點開細節用)。
 *
 * 重點:用 createPortal 掛到 <body>。
 * 因為區段外層有 Reveal 進場動畫(transform),若 Modal 留在原處,fixed 會相對那個
 * transform 祖先定位 → 跑到頁面偏下、像被「拉過去」。掛到 body 才能真正相對「視窗」置中。
 *
 * Esc / 點背景 / 關閉鈕都能關;開啟時鎖背景捲動;聚焦關閉鈕用 preventScroll 避免捲動跳動。
 */
export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { locale, t } = useLocale();
  const a = ACCENT[project.accent];
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t(project.name)}
    >
      {/* 背景遮罩 */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/40 backdrop-blur-sm"
      />
      {/* 內容 */}
      <div className="relative z-10 max-h-[88vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-card-hover sm:max-w-2xl sm:rounded-2xl">
        <div className={`h-1.5 w-full ${a.bar}`} />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-slate-100 hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-8">
          <h3 className="pr-10 text-xl font-bold text-ink">{t(project.name)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {t(project.tagline)}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tagLabel(tag, locale)}</Tag>
            ))}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ink-soft">
            {t(project.description)}
          </p>

          <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
            {project.highlights.map((h) => (
              <li key={h.zh} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                <Check className={`mt-0.5 h-4 w-4 shrink-0 ${a.check}`} />
                <span>{t(h)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  );
}
