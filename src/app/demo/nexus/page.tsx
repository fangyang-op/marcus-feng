"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Trophy,
  Sparkles,
  Calculator,
  Users,
  Activity,
  Megaphone,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import { DemoShell, type DemoNavItem } from "@/components/demo/DemoShell";
import { AIWidget } from "@/components/demo/nexus/AIWidget";
import { DashboardView } from "@/components/demo/nexus/DashboardView";
import { SchoolDatabaseView } from "@/components/demo/nexus/SchoolDatabaseView";
import { PlacementView } from "@/components/demo/nexus/PlacementView";
import { EPQuoteView } from "@/components/demo/nexus/EPQuoteView";
import { AnnouncementsView } from "@/components/demo/nexus/AnnouncementsView";
import { KnowledgeBaseView } from "@/components/demo/nexus/KnowledgeBaseView";
import { AISettingsView } from "@/components/demo/nexus/AISettingsView";
import { PermissionsView } from "@/components/demo/nexus/PermissionsView";
import {
  RankingsView,
  CrmView,
  UsageView,
} from "@/components/demo/nexus/SecondaryViews";

const NAV: DemoNavItem[] = [
  { key: "dashboard", label: "總覽", icon: LayoutDashboard, group: "主功能" },
  { key: "announcements", label: "最新公告", icon: Megaphone, group: "主功能" },
  { key: "wiki", label: "顧問知識庫", icon: BookOpen, group: "主功能" },
  { key: "schools", label: "常用院校資料庫", icon: Building2, group: "主功能" },
  { key: "rankings", label: "歷屆榜單", icon: Trophy, group: "主功能" },
  { key: "placement", label: "AI 落點分析", icon: Sparkles, group: "主功能" },
  { key: "quote", label: "EP 報價系統", icon: Calculator, group: "遊學資訊專區" },
  { key: "crm", label: "遊學學員 CRM", icon: Users, group: "遊學資訊專區" },
  { key: "aiSettings", label: "AI 設定", icon: Sparkles, group: "管理員專區" },
  { key: "permissions", label: "權限管理系統", icon: ShieldCheck, group: "管理員專區" },
  { key: "usage", label: "使用量監測", icon: Activity, group: "管理員專區" },
];

const TITLES: Record<string, string> = {
  dashboard: "總覽 Dashboard",
  announcements: "最新公告",
  wiki: "顧問知識庫",
  schools: "常用院校資料庫",
  rankings: "歷屆榜單查詢",
  placement: "AI 落點分析",
  quote: "EP 報價系統",
  crm: "遊學學員 CRM",
  aiSettings: "AI 設定",
  permissions: "權限管理系統",
  usage: "使用量監測",
};

export default function NexusDemoPage() {
  const [view, setView] = useState("dashboard");

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return <DashboardView />;
      case "announcements":
        return <AnnouncementsView />;
      case "wiki":
        return <KnowledgeBaseView />;
      case "schools":
        return <SchoolDatabaseView />;
      case "rankings":
        return <RankingsView />;
      case "placement":
        return <PlacementView />;
      case "quote":
        return <EPQuoteView />;
      case "crm":
        return <CrmView />;
      case "aiSettings":
        return <AISettingsView />;
      case "permissions":
        return <PermissionsView />;
      case "usage":
        return <UsageView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <DemoShell
      accent="nexus"
      brandName="Nexus"
      brandSub="顧問資訊整合中心"
      brandMark="Nx"
      nav={NAV}
      activeKey={view}
      onSelect={setView}
      title={TITLES[view] ?? "Nexus"}
      floating={<AIWidget />}
    >
      {renderView()}
    </DemoShell>
  );
}
