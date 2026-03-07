"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CalendarSettings {
  showLunar: boolean;
  darkMode: boolean;
  followSystem: boolean;
}

interface CalendarContextType {
  currentDate: Date;
  selectedDate: Date | null;
  viewMode: "month" | "week";
  settings: CalendarSettings;
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: Date | null) => void;
  setViewMode: (mode: "month" | "week") => void;
  updateSettings: (settings: Partial<CalendarSettings>) => void;
  goToToday: () => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
}

const CalendarContext = createContext<CalendarContextType | null>(null);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [settings, setSettings] = useState<CalendarSettings>({
    showLunar: true,
    darkMode: false,
    followSystem: false,
  });

  // 从 localStorage 加载设置
  useEffect(() => {
    const savedSettings = localStorage.getItem("calendarSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch {
        // 忽略解析错误
      }
    }
  }, []);

  // 保存设置到 localStorage
  useEffect(() => {
    localStorage.setItem("calendarSettings", JSON.stringify(settings));
  }, [settings]);

  // 处理深色模式
  useEffect(() => {
    const handleSystemTheme = () => {
      if (settings.followSystem) {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", isDark);
      } else {
        document.documentElement.classList.toggle("dark", settings.darkMode);
      }
    };

    handleSystemTheme();

    if (settings.followSystem) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", handleSystemTheme);
      return () => mediaQuery.removeEventListener("change", handleSystemTheme);
    }
  }, [settings.darkMode, settings.followSystem]);

  const updateSettings = (newSettings: Partial<CalendarSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const goToPreviousMonth = () => {
    const newCurrentDate = new Date(currentDate);
    newCurrentDate.setMonth(newCurrentDate.getMonth() - 1);
    setCurrentDate(newCurrentDate);
    // 滑动切换月份时自动选择当月第一天
    setSelectedDate(new Date(newCurrentDate.getFullYear(), newCurrentDate.getMonth(), 1));
  };

  const goToNextMonth = () => {
    const newCurrentDate = new Date(currentDate);
    newCurrentDate.setMonth(newCurrentDate.getMonth() + 1);
    setCurrentDate(newCurrentDate);
    // 滑动切换月份时自动选择当月第一天
    setSelectedDate(new Date(newCurrentDate.getFullYear(), newCurrentDate.getMonth(), 1));
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
    
    // 滑动切换周时，自动高亮该周的周一
    const dayOfWeek = newDate.getDay();
    // 计算周一的日期（周日为0，需要特殊处理）
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(newDate);
    monday.setDate(newDate.getDate() + mondayOffset);
    setSelectedDate(monday);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
    
    // 滑动切换周时，自动高亮该周的周一
    const dayOfWeek = newDate.getDay();
    // 计算周一的日期（周日为0，需要特殊处理）
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(newDate);
    monday.setDate(newDate.getDate() + mondayOffset);
    setSelectedDate(monday);
  };

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        selectedDate,
        viewMode,
        settings,
        setCurrentDate,
        setSelectedDate,
        setViewMode,
        updateSettings,
        goToToday,
        goToPreviousMonth,
        goToNextMonth,
        goToPreviousWeek,
        goToNextWeek,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
