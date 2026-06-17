"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { useLocale } from "@/i18n";
import { LangToggle } from "./ui/LangToggle";

/** 頂部導覽：sticky、半透明毛玻璃、桌機顯示錨點；中/EN 切換鈕桌機手機都顯示 */
export function Header() {
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-2 px-5 sm:px-8">
        <Link href="#top" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white">
            MF
          </span>
          <span className="hidden text-sm font-semibold text-ink sm:inline">
            馮若陽 <span className="text-ink-muted">Marcus Feng</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-slate-100 hover:text-brand-700"
            >
              {t(item.label)}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LangToggle />
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-brand-700 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
