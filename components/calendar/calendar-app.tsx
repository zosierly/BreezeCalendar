"use client";

import { useState, useCallback } from "react";
import { CalendarProvider } from "@/lib/calendar-context";
import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";
import { DateDetail } from "./date-detail";
import { BottomNav } from "./bottom-nav";
import { SettingsPage } from "./settings-page";
import { DecorativeElements } from "./decorative-elements";

function CalendarContent() {
  const [currentPage, setCurrentPage] = useState<"calendar" | "settings">("calendar");

  const handleNavigate = useCallback((page: "calendar" | "settings") => {
    setCurrentPage(page);
  }, []);

  if (currentPage === "settings") {
    return (
      <>
        <SettingsPage onBack={() => setCurrentPage("calendar")} />
        <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 装饰背景 */}
      <DecorativeElements />

      {/* 主内容 */}
      <main className="relative max-w-md mx-auto p-4">
        {/* 可爱的标题 */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <span className="text-3xl">🌸</span>
            <span className="bg-gradient-to-r from-primary via-coral to-yellow bg-clip-text text-transparent">
              清风日历
            </span>
            <span className="text-3xl">🌸</span>
          </h1>
        </div>

        <CalendarHeader />
        <CalendarGrid />
        <DateDetail />
      </main>

      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}

export function CalendarApp() {
  return (
    <CalendarProvider>
      <CalendarContent />
    </CalendarProvider>
  );
}
