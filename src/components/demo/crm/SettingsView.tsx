"use client";

import { useState } from "react";
import {
  Settings,
  Users2,
  Tags,
  FileText,
  ShieldCheck,
  Building2,
  Bell,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

import { PageContainer, PageTitle, Card } from "@/components/demo/primitives";
import { DemoModal } from "@/components/demo/widgets";

interface SettingCard {
  icon: LucideIcon;
  title: string;
  desc: string;
  /** Modal 內的功能條列 */
  detail: string[];
  /** 角落小統計,讓設定看起來真的在運作 */
  stat: string;
}

const SETTING_CARDS: SettingCard[] = [
  {
    icon: Users2,
    title: "成員與權限",
    desc: "管理顧問帳號、角色與部門",
    stat: "8 位顧問 · 3 個部門",
    detail: [
      "前端 / 後端顧問角色與權限矩陣",
      "部門分組與主管指派",
      "登入裝置與單一登入(SSO)設定",
      "離職帳號停用與資料移交",
    ],
  },
  {
    icon: Tags,
    title: "學生狀態",
    desc: "自訂招生 / 成交 / 申請各階段狀態",
    stat: "14 個狀態 · 4 大分類",
    detail: [
      "新增、停用與排序自訂狀態",
      "狀態自動轉換規則(如成交後啟動服務)",
      "各階段對應的待辦與提醒模板",
      "看板欄位與狀態的對應設定",
    ],
  },
  {
    icon: FileText,
    title: "文件模板",
    desc: "設定申請準備 Checklist 清單",
    stat: "6 份必備 · 12 份選用",
    detail: [
      "依國家 / 學位套用不同 Checklist",
      "文件版本控管與審核流程",
      "字數方案與餘額扣抵規則",
      "推薦信邀請與回收追蹤",
    ],
  },
  {
    icon: Building2,
    title: "方案與績效",
    desc: "服務方案、金額與分潤規則",
    stat: "5 種方案 · 自訂分潤",
    detail: [
      "標準 / 旗艦方案定價與內容",
      "前端 / 後端 / 轉介分潤比例",
      "業績結算週期與報表",
      "退款與方案調整紀錄",
    ],
  },
  {
    icon: Bell,
    title: "通知設定",
    desc: "待辦提醒與重複名單告警",
    stat: "Email · LINE · 站內",
    detail: [
      "截止日逼近與逾期申請提醒",
      "未分配後端顧問告警",
      "重複手機 / Email 名單偵測",
      "每日營運摘要推播時間",
    ],
  },
  {
    icon: ShieldCheck,
    title: "資料與稽核",
    desc: "活動紀錄與資料保留政策",
    stat: "留存 365 天",
    detail: [
      "完整操作活動紀錄(Audit Log)",
      "個資存取權限與遮罩規則",
      "資料匯出與備份排程",
      "資料保留與刪除政策",
    ],
  },
];

export function SettingsView() {
  const [openCard, setOpenCard] = useState<SettingCard | null>(null);

  return (
    <PageContainer>
      <PageTitle
        icon={Settings}
        title="設定"
        subtitle="6 個系統模組 · 點任一張卡查看可設定項目"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SETTING_CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.title} className="p-0">
              <button
                type="button"
                onClick={() => setOpenCard(c)}
                className="flex h-full w-full flex-col items-start p-5 text-left transition-colors hover:bg-crm-soft/30"
              >
                <div className="flex w-full items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-crm-soft text-crm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-ink">{c.title}</h3>
                <p className="mt-1 text-xs text-ink-muted">{c.desc}</p>
                <span className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-ink-soft">
                  {c.stat}
                </span>
              </button>
            </Card>
          );
        })}
      </div>

      <DemoModal
        open={openCard !== null}
        onClose={() => setOpenCard(null)}
        title={openCard ? `${openCard.title} · 可設定項目` : ""}
        accentClass="bg-crm"
      >
        {openCard && (
          <div>
            <p className="text-ink-soft">{openCard.desc}</p>
            <ul className="mt-3 space-y-2">
              {openCard.detail.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-ink-soft">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crm" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-muted">
              此模組於作品集 Demo 中為示意,正式系統可實際設定並寫入資料。
            </p>
          </div>
        )}
      </DemoModal>
    </PageContainer>
  );
}
