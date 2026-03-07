"use client";

import { ChevronLeft, ChevronRight, Calendar, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendar } from "@/lib/calendar-context";
import { solarToLunar } from "@/lib/lunar";
import { useState } from "react";
import { YearMonthPicker } from "./year-month-picker";

export function CalendarHeader() {
  const {
    currentDate,
    selectedDate,
    viewMode,
    setViewMode,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    settings,
  } = useCalendar();

  const [showPicker, setShowPicker] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // 获取农历年份信息 - 基于选中日期来显示，这样除夕和春节能显示正确的农历年
  const lunarDate = selectedDate || currentDate;
  const lunar = solarToLunar(
    lunarDate.getFullYear(),
    lunarDate.getMonth() + 1,
    lunarDate.getDate()
  );

  const handlePrevious = () => {
    if (viewMode === "month") {
      goToPreviousMonth();
    } else {
      goToPreviousWeek();
    }
  };

  const handleNext = () => {
    if (viewMode === "month") {
      goToNextMonth();
    } else {
      goToNextWeek();
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "month" ? "week" : "month");
  };

  return (
    <>
      <header className="bg-card rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between">
          {/* 左侧：上一月按钮 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="rounded-full hover:bg-pink-light text-foreground"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* 中间：年月显示 */}
          <button
            onClick={() => setShowPicker(true)}
            className="flex flex-col items-center hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl font-bold text-foreground">
              {year}年{month}月
            </span>
            {settings.showLunar && (
              <span className="text-sm text-muted-foreground">
                {lunar.ganZhi}年 {lunar.zodiac}年
              </span>
            )}
          </button>

          {/* 右侧：下一月按钮 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="rounded-full hover:bg-pink-light text-foreground"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* 功能按钮区 */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Calendar className="h-4 w-4 mr-1" />
            今天
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleViewMode}
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Layers className="h-4 w-4 mr-1" />
            {viewMode === "month" ? "周视图" : "月视图"}
          </Button>
        </div>
      </header>

      {/* 年月选择器弹窗 */}
      <YearMonthPicker
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
      />
    </>
  );
}
