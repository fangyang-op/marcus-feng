"use client";

import {
  Settings,
  Users2,
  Tags,
  FileText,
  ShieldCheck,
  Building2,
  Bell,
  type LucideIcon,
} from "lucide-react";

import { PageContainer, PageTitle, Card } from "@/components/demo/primitives";

const SETTING_CARDS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Users2, title: "成員與權限", desc: "管理顧問帳號、角色與部門" },
  { icon: Tags, title: "學生狀態", desc: "自訂招生 / 成交 / 申請各階段狀態" },
  { icon: FileText, title: "文件模板", desc: "設定申請準備 Checklist 清單" },
  { icon: Building2, title: "方案與績效", desc: "服務方案、金額與分潤規則" },
  { icon: Bell, title: "通知設定", desc: "待辦提醒與重複名單告警" },
  { icon: ShieldCheck, title: "資料與稽核", desc: "活動紀錄與資料保留政策" },
];

export function SettingsView() {
  return (
    <PageContainer>
      <PageTitle
        icon={Settings}
        title="設定"
        subtitle="此頁於 Demo 中簡化呈現"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SETTING_CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.title} className="transition-shadow hover:shadow-md">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-crm-soft text-crm">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-ink">{c.title}</h3>
              <p className="mt-1 text-xs text-ink-muted">{c.desc}</p>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}

/** 次要 nav 的通用佔位 view */
export function PlaceholderView({ title }: { title: string }) {
  return (
    <PageContainer>
      <PageTitle icon={Settings} title={title} subtitle="此頁於 Demo 中簡化呈現" />
      <Card>
        <p className="text-sm text-ink-muted">
          此功能於作品集 Demo 中簡化呈現,完整版包含實際資料操作與 API 串接。
        </p>
      </Card>
    </PageContainer>
  );
}
