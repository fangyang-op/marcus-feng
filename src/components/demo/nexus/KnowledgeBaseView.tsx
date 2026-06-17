"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  Star,
  BadgeCheck,
  X,
  FileText,
} from "lucide-react";
import { PageContainer, PageTitle, Card, Pill } from "@/components/demo/primitives";
import {
  WIKI_ARTICLES,
  WIKI_CATEGORIES,
  WIKI_CATEGORY_COLOR,
  type WikiArticle,
  type WikiCategory,
} from "@/data/demo/nexus";

export function KnowledgeBaseView() {
  const [cat, setCat] = useState<string>("全部");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<WikiArticle | null>(null);

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = WIKI_ARTICLES.filter((a) => {
      if (cat !== "全部" && a.category !== cat) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
      );
    });
    return [...filtered].sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [cat, search]);

  const countOf = (c: string) =>
    c === "全部"
      ? WIKI_ARTICLES.length
      : WIKI_ARTICLES.filter((a) => a.category === c).length;

  return (
    <PageContainer>
      <PageTitle
        icon={BookOpen}
        title="顧問知識庫"
        subtitle={`${WIKI_ARTICLES.length} 篇 SOP / FAQ / 話術 / 合約指南（全為示意假資料）`}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[200px_1fr]">
        {/* 左側分類 */}
        <Card padded={false} className="h-fit overflow-hidden">
          <div className="border-b border-slate-100 px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-muted">
            分類
          </div>
          <div className="p-2">
            {WIKI_CATEGORIES.map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-nexus-pink/10 text-nexus-pink"
                      : "text-ink-soft hover:bg-slate-50"
                  }`}
                >
                  <span>{c}</span>
                  <span
                    className={`rounded-full px-1.5 text-[10px] font-bold ${
                      active ? "bg-nexus-pink/20 text-nexus-pink" : "bg-slate-100 text-ink-muted"
                    }`}
                  >
                    {countOf(c)}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* 右側：搜尋 + 文章卡 */}
        <div>
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜尋文章標題或內容…"
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-nexus-pink focus:ring-2 focus:ring-nexus-pink/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {list.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setOpen(a)}
                className="group flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-nexus-pink/40 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {a.pinned && (
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  )}
                  <Pill color={WIKI_CATEGORY_COLOR[a.category as WikiCategory]}>
                    {a.category}
                  </Pill>
                  {a.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      已驗證
                    </span>
                  )}
                </div>
                <h4 className="font-bold leading-snug text-ink group-hover:text-nexus-pink">
                  {a.title}
                </h4>
                <p className="line-clamp-2 text-sm text-ink-soft">{a.summary}</p>
                <div className="mt-auto pt-1 text-[11px] text-ink-muted">
                  最後修改 {a.updatedAt}
                </div>
              </button>
            ))}
            {list.length === 0 && (
              <Card className="col-span-full text-center text-sm text-ink-muted">
                找不到符合條件的文章，請調整分類或搜尋。
              </Card>
            )}
          </div>
        </div>
      </div>

      {open && <ArticleModal article={open} onClose={() => setOpen(null)} />}
    </PageContainer>
  );
}

function ArticleModal({
  article,
  onClose,
}: {
  article: WikiArticle;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-start justify-between gap-3 bg-gradient-to-br from-nexus-pink to-nexus-purple p-5 text-white">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold">
                {article.category}
              </span>
              {article.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  已驗證
                </span>
              )}
            </div>
            <h3 className="mt-1.5 text-lg font-bold leading-snug">{article.title}</h3>
            <p className="mt-0.5 text-sm text-white/80">最後修改 {article.updatedAt}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉"
            className="rounded-md p-1 text-white/80 hover:bg-white/15 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="scrollbar-thin flex-1 overflow-y-auto p-6">
          <p className="mb-4 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-ink-soft">
            {article.summary}
          </p>
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-soft">
            {article.content}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-nexus-pink px-4 py-2 text-sm font-semibold text-white hover:bg-nexus-purple"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
