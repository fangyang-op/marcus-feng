"use client";

import { FileText, Download, Check, Mail } from "lucide-react";
import { SectionHeading } from "./ui/Section";
import { knowledgeDocs } from "@/data/knowledge";
import { siteConfig } from "@/data/site";
import { ui } from "@/data/ui";
import { useLocale } from "@/i18n";

/**
 * 知識傳承區 — 差異化重點。
 * 深藍底反白，把「個人工作 → 團隊可繼承資產」這個賣點放大。
 */
export function Knowledge() {
  const { locale, t } = useLocale();
  return (
    <section id="knowledge" className="scroll-mt-20 bg-brand-950 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <SectionHeading
          invert
          eyebrow={ui.knowledge.eyebrow}
          title={t(ui.knowledge.title)}
          description={t(ui.knowledge.description)}
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {knowledgeDocs.map((doc) => (
            <article
              key={doc.id}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.1]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-200">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{t(doc.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {t(doc.summary)}
              </p>

              <ul className="mt-4 flex-1 space-y-2">
                {doc.points.map((p) => (
                  <li key={p.zh} className="flex gap-2 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                    <span>{t(p)}</span>
                  </li>
                ))}
              </ul>

              {/* CTA:三張卡都用「全寬按鈕 + 一行說明」結構，讓按鈕水平對齊；
                  下載卡的說明行留隱形佔位，三張卡會一起被說明文字往下撐。 */}
              <div className="mt-6">
                {doc.requestOnly ? (
                  <a
                    href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                      `${locale === "zh" ? "索取文件" : "Request"}: ${t(doc.title)}`
                    )}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.12]"
                  >
                    <Mail className="h-4 w-4" />
                    {t(ui.knowledge.request)}
                  </a>
                ) : (
                  <a
                    href={doc.pdfHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50"
                  >
                    <Download className="h-4 w-4" />
                    {t(ui.knowledge.download)}
                  </a>
                )}
                {/* 固定高度,讓中文 1 行 / 英文 2 行的說明都保留同樣空間,三張卡按鈕對齊 */}
                <p
                  className={`mt-2 min-h-[2.75rem] text-center text-xs leading-relaxed text-slate-400 ${
                    doc.requestOnly ? "" : "invisible select-none"
                  }`}
                  aria-hidden={doc.requestOnly ? undefined : true}
                >
                  {doc.requestOnly && doc.requestNote ? t(doc.requestNote) : ""}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
