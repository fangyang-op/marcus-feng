"use client";

import { useMemo, useState } from "react";
import {
  Megaphone,
  Star,
  BadgeCheck,
  Calendar,
  Clock,
  MapPin,
  X,
} from "lucide-react";
import {
  PageContainer,
  PageTitle,
  Card,
  Pill,
  Tabs,
} from "@/components/demo/primitives";
import {
  ANNOUNCEMENTS,
  ANNOUNCEMENT_CATEGORIES,
  ANNOUNCEMENT_CATEGORY_COLOR,
  type Announcement,
} from "@/data/demo/nexus";

const NEXUS_TAB = "border-nexus-pink text-nexus-pink";

export function AnnouncementsView() {
  const [cat, setCat] = useState<string>("全部");
  const [open, setOpen] = useState<Announcement | null>(null);

  const list = useMemo(() => {
    const filtered =
      cat === "全部"
        ? ANNOUNCEMENTS
        : ANNOUNCEMENTS.filter((a) => a.category === cat);
    // 置頂優先,其餘維持原本(已寫死)日期降冪
    return [...filtered].sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [cat]);

  const pinnedCount = ANNOUNCEMENTS.filter((a) => a.pinned).length;
  const eventCount = ANNOUNCEMENTS.filter((a) => a.category === "活動").length;

  return (
    <PageContainer>
      <PageTitle
        icon={Megaphone}
        title="最新公告"
        subtitle="合作廠商 / 內部 / 規則 / 活動公告整合(全為示意假資料)"
      />

      <div className="mb-5 grid grid-cols-3 gap-4">
        <Card>
          <div className="text-sm font-medium text-ink-muted">公告總數</div>
          <div className="mt-1 text-2xl font-bold text-ink">{ANNOUNCEMENTS.length}</div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-ink-muted">置頂公告</div>
          <div className="mt-1 text-2xl font-bold text-amber-500">{pinnedCount}</div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-ink-muted">近期活動</div>
          <div className="mt-1 text-2xl font-bold text-emerald-600">{eventCount}</div>
        </Card>
      </div>

      <div className="mb-4">
        <Tabs
          items={ANNOUNCEMENT_CATEGORIES.map((c) => ({ key: c, label: c }))}
          value={cat}
          onChange={setCat}
          accentClass={NEXUS_TAB}
        />
      </div>

      <div className="space-y-3">
        {list.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setOpen(a)}
            className="group flex w-full flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-nexus-pink/40 hover:shadow-md"
          >
            <div className="flex flex-wrap items-center gap-2">
              {a.pinned && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  置頂
                </span>
              )}
              <Pill color={ANNOUNCEMENT_CATEGORY_COLOR[a.category]}>{a.category}</Pill>
              {a.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  已驗證
                </span>
              )}
              <span className="ml-auto text-xs text-ink-muted">{a.date}</span>
            </div>

            <h3 className="font-bold text-ink group-hover:text-nexus-pink">{a.title}</h3>
            <p className="line-clamp-2 text-sm text-ink-soft">{a.summary}</p>

            {a.category === "活動" && a.eventDate && (
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 rounded-lg bg-emerald-50/60 px-3 py-2 text-xs font-medium text-emerald-700">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {a.eventDate}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {a.eventTime}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {a.eventLocation}
                </span>
              </div>
            )}
          </button>
        ))}
        {list.length === 0 && (
          <Card className="text-center text-sm text-ink-muted">此分類目前沒有公告。</Card>
        )}
      </div>

      {open && <AnnouncementModal item={open} onClose={() => setOpen(null)} />}
    </PageContainer>
  );
}

function AnnouncementModal({
  item,
  onClose,
}: {
  item: Announcement;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-start justify-between gap-3 bg-gradient-to-br from-nexus-pink to-nexus-purple p-5 text-white">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold">
                {item.category}
              </span>
              {item.pinned && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
                  <Star className="h-3 w-3 fill-white text-white" />
                  置頂
                </span>
              )}
              {item.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  已驗證
                </span>
              )}
            </div>
            <h3 className="mt-1.5 text-lg font-bold leading-snug">{item.title}</h3>
            <p className="mt-0.5 text-sm text-white/80">{item.date}</p>
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

        <div className="scrollbar-thin flex-1 overflow-y-auto p-5">
          {item.category === "活動" && item.eventDate && (
            <div className="mb-4 grid grid-cols-1 gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-700 sm:grid-cols-3">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {item.eventDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {item.eventTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {item.eventLocation}
              </span>
            </div>
          )}
          <p className="whitespace-pre-line text-sm leading-relaxed text-ink-soft">
            {item.content}
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
