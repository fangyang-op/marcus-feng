"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  KanbanSquare,
  Settings,
  ClipboardCheck,
} from "lucide-react";

import { DemoShell, type DemoNavItem } from "@/components/demo/DemoShell";
import { DashboardView } from "@/components/demo/crm/DashboardView";
import { StudentsView } from "@/components/demo/crm/StudentsView";
import { StudentDetailView } from "@/components/demo/crm/StudentDetailView";
import { ApplicationsView } from "@/components/demo/crm/ApplicationsView";
import { SchoolsView } from "@/components/demo/crm/SchoolsView";
import { SettingsView } from "@/components/demo/crm/SettingsView";
import { UatView } from "@/components/demo/crm/UatView";
import { STUDENTS, isUnassignedBackend, UAT_SUMMARY } from "@/data/demo/crm";

type ViewKey =
  | "dashboard"
  | "students"
  | "schools"
  | "applications"
  | "uat"
  | "settings";

const NAV_TITLES: Record<ViewKey, string> = {
  dashboard: "儀表板",
  students: "學生專案管理",
  schools: "常用院校檢索",
  applications: "申請進度看板",
  uat: "內部封測",
  settings: "設定",
};

export default function CrmDemoPage() {
  const [view, setView] = useState<ViewKey>("students");
  /** 學生 360 詳情：null = 列表；否則為學生 id */
  const [openStudent, setOpenStudent] = useState<string | null>(null);
  /** 從儀表板提醒進來時，預選「待分配後端」tab */
  const [studentsTab, setStudentsTab] = useState<"all" | "unassigned">("all");

  const unassignedCount = STUDENTS.filter(isUnassignedBackend).length;

  const nav: DemoNavItem[] = [
    { key: "dashboard", label: "儀表板", icon: LayoutDashboard },
    {
      key: "students",
      label: "學生專案管理",
      icon: Users,
      badge: unassignedCount,
    },
    { key: "schools", label: "常用院校檢索", icon: GraduationCap },
    { key: "applications", label: "申請進度看板", icon: KanbanSquare },
    {
      key: "uat",
      label: "內部封測",
      icon: ClipboardCheck,
      badge: UAT_SUMMARY.untested,
    },
    { key: "settings", label: "設定", icon: Settings },
  ];

  const selectView = (key: string) => {
    setView(key as ViewKey);
    setOpenStudent(null);
    if (key === "students") setStudentsTab("all");
  };

  // 標題：在學生詳情時顯示「學生詳情」
  const title =
    view === "students" && openStudent ? "學生詳情" : NAV_TITLES[view];

  return (
    <DemoShell
      accent="crm"
      brandName="CRM 全端營運平台"
      brandSub="顧問資訊整合中心"
      brandMark="CRM"
      nav={nav}
      activeKey={view}
      onSelect={selectView}
      title={title}
    >
      {view === "dashboard" && (
        <DashboardView
          onGoUnassigned={() => {
            setView("students");
            setStudentsTab("unassigned");
            setOpenStudent(null);
          }}
        />
      )}

      {view === "students" &&
        (openStudent ? (
          <StudentDetailView
            studentId={openStudent}
            onBack={() => setOpenStudent(null)}
          />
        ) : (
          <StudentsView
            key={studentsTab}
            initialTab={studentsTab}
            onOpenStudent={(id) => setOpenStudent(id)}
          />
        ))}

      {view === "schools" && <SchoolsView />}
      {view === "applications" && <ApplicationsView />}
      {view === "uat" && <UatView />}
      {view === "settings" && <SettingsView />}
    </DemoShell>
  );
}
