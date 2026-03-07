"use client";

import { useCalendar } from "@/lib/calendar-context";
import { getDayInfo } from "@/lib/lunar";
import { useMemo } from "react";

const WEEKDAY_NAMES = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export function DateDetail() {
  const { selectedDate, settings } = useCalendar();

  const dateInfo = useMemo(() => {
    // 如果没有选中日期，返回 null
    if (!selectedDate) return null;
    
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const weekday = selectedDate.getDay();

    const info = getDayInfo(year, month, day);

    return {
      solar: {
        year,
        month,
        day,
        weekday: WEEKDAY_NAMES[weekday],
      },
      lunar: info.lunar,
      solarTerm: info.solarTerm,
      traditionalFestival: info.traditionalFestival,
      traditionalFestivals: info.traditionalFestivals,
      solarFestival: info.solarFestival,
      solarFestivals: info.solarFestivals,
      allFestivals: info.allFestivals,
    };
  }, [selectedDate]);

  // 如果没有选中日期，不显示详情
  if (!dateInfo) {
    return null;
  }

  // 去重并保持顺序
  const uniqueFestivals = [...new Set(dateInfo.allFestivals)];

  return (
    <div className="bg-card rounded-2xl shadow-sm p-4 mt-4">
      <div className="flex items-start gap-4">
        {/* 左侧：公历大日期 */}
        <div className="flex-shrink-0 text-center">
          <div className="text-5xl font-bold text-primary">
            {dateInfo.solar.day}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {dateInfo.solar.weekday}
          </div>
        </div>

        {/* 右侧：详细信息 */}
        <div className="flex-1 min-w-0">
          {/* 公历日期 */}
          <p className="text-foreground font-medium">
            {dateInfo.solar.year}年{dateInfo.solar.month}月{dateInfo.solar.day}
            日
          </p>

          {/* 农历信息 */}
          {settings.showLunar && (
            <div className="mt-2 space-y-1">
              <p className="text-sm text-muted-foreground">
                农历：{dateInfo.lunar.ganZhi}年（{dateInfo.lunar.year}）{dateInfo.lunar.monthStr}
                {dateInfo.lunar.dayStr}
              </p>
              <p className="text-sm text-muted-foreground">
                生肖：{dateInfo.lunar.zodiac}年
              </p>
            </div>
          )}

          {/* 节日/节气标签 - 显示所有节日 */}
          {uniqueFestivals.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {dateInfo.traditionalFestivals.map((festival) => (
                <span
                  key={`trad-${festival}`}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary"
                >
                  {festival}
                </span>
              ))}
              {dateInfo.solarTerm && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-mint/30 text-foreground">
                  {dateInfo.solarTerm}
                </span>
              )}
              {dateInfo.solarFestivals.map((festival) => (
                <span
                  key={`solar-${festival}`}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-coral/20 text-foreground"
                >
                  {festival}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
