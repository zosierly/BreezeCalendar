"use client";

import { useMemo } from "react";
import { useCalendar } from "@/lib/calendar-context";
import { getDayInfo } from "@/lib/lunar";
import { cn } from "@/lib/utils";
import { useSwipe } from "@/hooks/use-swipe";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];

interface DayInfo {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isWeekend: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  lunar: {
    dayStr: string;
    monthStr: string;
  };
  solarTerm: string | null;
  traditionalFestival: string | null;
  traditionalFestivals: string[];
  solarFestival: string | null;
  solarFestivals: string[];
  allFestivals: string[];
  displayText: string;
}

export function CalendarGrid() {
  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    settings,
    viewMode,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousWeek,
    goToNextWeek,
  } = useCalendar();

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (viewMode === "month") {
        goToNextMonth();
      } else {
        goToNextWeek();
      }
    },
    onSwipeRight: () => {
      if (viewMode === "month") {
        goToPreviousMonth();
      } else {
        goToPreviousWeek();
      }
    },
    threshold: 50,
  });

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (viewMode === "week") {
      // 周视图：获取当前周的日期
      const currentDay = currentDate.getDate();
      const dayOfWeek = currentDate.getDay();
      // 调整为周一开始
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const monday = new Date(year, month, currentDay + mondayOffset);

      const days: DayInfo[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        const dayInfo = getDayInfo(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        );
        const today = new Date();

        // 使用时间戳比较确保日期完全匹配，只有用户手动选中时才高亮
        const isSelectedDay = selectedDate !== null &&
          date.getTime() === new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
          ).getTime();

        days.push({
          date,
          day: date.getDate(),
          isCurrentMonth: date.getMonth() === month,
          isToday:
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear(),
          isSelected: isSelectedDay,
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          isSaturday: date.getDay() === 6,
          isSunday: date.getDay() === 0,
          lunar: {
            dayStr: dayInfo.lunar.dayStr,
            monthStr: dayInfo.lunar.monthStr,
          },
          solarTerm: dayInfo.solarTerm,
          traditionalFestival: dayInfo.traditionalFestival,
          traditionalFestivals: dayInfo.traditionalFestivals,
          solarFestival: dayInfo.solarFestival,
          solarFestivals: dayInfo.solarFestivals,
          allFestivals: dayInfo.allFestivals,
          displayText: dayInfo.displayText,
        });
      }
      return days;
    }

    // 月视图：获取当月的日期
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    // 获取第一天是星期几（0是周日，需要转换为周一开始）
    let firstDayWeekday = firstDayOfMonth.getDay();
    firstDayWeekday = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

    // 获取上个月的最后几天
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days: DayInfo[] = [];
    const today = new Date();

    // 上个月的日期
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 1, day);
      const dayInfo = getDayInfo(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );

      // 使用时间戳比较确保日期完全匹配，只有用户手动选中时才高亮
      const isSelectedDay = selectedDate !== null &&
        date.getTime() === new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        ).getTime();

      days.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: isSelectedDay,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        isSaturday: date.getDay() === 6,
        isSunday: date.getDay() === 0,
        lunar: {
          dayStr: dayInfo.lunar.dayStr,
          monthStr: dayInfo.lunar.monthStr,
        },
        solarTerm: dayInfo.solarTerm,
        traditionalFestival: dayInfo.traditionalFestival,
        traditionalFestivals: dayInfo.traditionalFestivals,
        solarFestival: dayInfo.solarFestival,
        solarFestivals: dayInfo.solarFestivals,
        allFestivals: dayInfo.allFestivals,
        displayText: dayInfo.displayText,
      });
    }

    // 当月的日期
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayInfo = getDayInfo(year, month + 1, day);

      // 只有当选中日期与当前日期完全匹配时才标记为选中，只有用户手动选中时才高亮
      const isSelectedDay = selectedDate !== null &&
        date.getTime() === new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        ).getTime();

      days.push({
        date,
        day,
        isCurrentMonth: true,
        isToday:
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear(),
        isSelected: isSelectedDay,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        isSaturday: date.getDay() === 6,
        isSunday: date.getDay() === 0,
        lunar: {
          dayStr: dayInfo.lunar.dayStr,
          monthStr: dayInfo.lunar.monthStr,
        },
        solarTerm: dayInfo.solarTerm,
        traditionalFestival: dayInfo.traditionalFestival,
        traditionalFestivals: dayInfo.traditionalFestivals,
        solarFestival: dayInfo.solarFestival,
        solarFestivals: dayInfo.solarFestivals,
        allFestivals: dayInfo.allFestivals,
        displayText: dayInfo.displayText,
      });
    }

    // 下个月的日期（填充到6行）
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      const dayInfo = getDayInfo(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );

      days.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        isSaturday: date.getDay() === 6,
        isSunday: date.getDay() === 0,
        lunar: {
          dayStr: dayInfo.lunar.dayStr,
          monthStr: dayInfo.lunar.monthStr,
        },
        solarTerm: dayInfo.solarTerm,
        traditionalFestival: dayInfo.traditionalFestival,
        traditionalFestivals: dayInfo.traditionalFestivals,
        solarFestival: dayInfo.solarFestival,
        solarFestivals: dayInfo.solarFestivals,
        allFestivals: dayInfo.allFestivals,
        displayText: dayInfo.displayText,
      });
    }

    return days;
  }, [currentDate, selectedDate, viewMode]);

  const handleDayClick = (day: DayInfo) => {
    setSelectedDate(day.date);
  };

  // 生成tooltip内容
  const getTooltipContent = (day: DayInfo) => {
    const items: string[] = [];
    items.push(day.lunar.dayStr);
    if (day.allFestivals.length > 0) {
      items.push(...day.allFestivals);
    }
    return items.join(" / ");
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className="bg-card rounded-2xl shadow-sm p-4 select-none"
        {...swipeHandlers}
      >
        {/* 星期标题 */}
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map((day, index) => (
            <div
              key={day}
              className={cn(
                "text-center py-2 text-sm font-medium",
                index === 5 && "text-saturday",
                index === 6 && "text-sunday",
                index < 5 && "text-muted-foreground"
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 日期网格 */}
        <div
          className={cn("grid grid-cols-7 gap-1", viewMode === "week" && "")}
        >
          {calendarDays.map((day, index) => {
            const hasMultipleFestivals = day.allFestivals.length > 1;
            const dayButton = (
              <button
                key={index}
                onClick={() => handleDayClick(day)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-1 rounded-xl transition-all duration-200",
                  viewMode === "week" ? "h-20" : "h-14 sm:h-16",
                  // 基础样式
                  "hover:scale-105 active:scale-95",
                  // 当前月份
                  day.isCurrentMonth
                    ? "text-foreground"
                    : "text-muted-foreground/50",
                  // 周末颜色
                  day.isSaturday && day.isCurrentMonth && "text-saturday",
                  day.isSunday && day.isCurrentMonth && "text-sunday",
                  // 今天
                  day.isToday &&
                    "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-card",
                  // 选中
                  day.isSelected &&
                    !day.isToday &&
                    "bg-pink-light ring-1 ring-primary",
                  // 节日/节气高亮
                  (day.traditionalFestival || day.solarTerm) &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "bg-accent/30"
                )}
              >
                {/* 多节日指示器 */}
                {hasMultipleFestivals && day.isCurrentMonth && (
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-coral" />
                )}
                {/* 公历日期 */}
                <span
                  className={cn(
                    "text-base sm:text-lg font-bold",
                    day.isToday && "text-primary-foreground"
                  )}
                >
                  {day.day}
                </span>

                {/* 农历/节日/节气 */}
                {settings.showLunar && (
                  <span
                    className={cn(
                      "text-[10px] sm:text-xs truncate w-full text-center",
                      // 非当前月份的农历日期使用与阳历相同的灰色
                      !day.isCurrentMonth && "text-muted-foreground/50",
                      // 当前月份的样式
                      day.isCurrentMonth && day.isToday && "text-primary-foreground/80",
                      day.isCurrentMonth &&
                        !day.isToday &&
                        day.traditionalFestival &&
                        "text-primary font-medium",
                      day.isCurrentMonth &&
                        !day.isToday &&
                        day.solarTerm &&
                        !day.traditionalFestival &&
                        "text-mint font-medium",
                      day.isCurrentMonth &&
                        !day.isToday &&
                        day.solarFestival &&
                        !day.traditionalFestival &&
                        !day.solarTerm &&
                        "text-coral",
                      day.isCurrentMonth &&
                        !day.isToday &&
                        !day.traditionalFestival &&
                        !day.solarTerm &&
                        !day.solarFestival &&
                        "text-muted-foreground"
                    )}
                  >
                    {day.displayText}
                  </span>
                )}
              </button>
            );

            // 如果有多个节日，使用Tooltip包装
            if (hasMultipleFestivals && day.isCurrentMonth) {
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>{dayButton}</TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[200px]">
                    <p>{getTooltipContent(day)}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return dayButton;
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
