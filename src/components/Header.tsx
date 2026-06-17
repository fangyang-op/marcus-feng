import Link from "next/link";
import { siteConfig } from "@/data/site";

/** 頂部導覽:sticky、半透明毛玻璃、桌機顯示錨點、行動版只留品牌與履歷 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-5 sm:px-8">
        <Link href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white">
            MF
          </span>
          <span className="text-sm font-semibold text-ink">
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
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-brand-700 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
        >
          LinkedIn
        </a>
      </div>
    </header>
  );
}
