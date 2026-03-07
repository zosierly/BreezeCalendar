"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendar } from "@/lib/calendar-context";
import { cn } from "@/lib/utils";

interface YearMonthPickerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function YearMonthPicker({ isOpen, onClose }: YearMonthPickerProps) {
  const { currentDate, setCurrentDate } = useCalendar();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const yearContainerRef = useRef<HTMLDivElement>(null);

  // 生成年份列表 (1900-2100)
  const years = Array.from({ length: 201 }, (_, i) => 1900 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    if (isOpen) {
      setSelectedYear(currentDate.getFullYear());
      setSelectedMonth(currentDate.getMonth() + 1);
      
      // 滚动到当前年份
      setTimeout(() => {
        if (yearContainerRef.current) {
          const yearIndex = selectedYear - 1900;
          const itemHeight = 48;
          yearContainerRef.current.scrollTop = yearIndex * itemHeight - 100;
        }
      }, 100);
    }
  }, [isOpen, currentDate, selectedYear]);

  const handleConfirm = () => {
    const newDate = new Date(selectedYear, selectedMonth - 1, 1);
    setCurrentDate(newDate);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />

      {/* 弹窗内容 */}
      <div className="relative w-full max-w-md bg-card rounded-t-3xl sm:rounded-3xl shadow-xl animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">选择年月</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* 选择器主体 */}
        <div className="flex p-4 gap-4">
          {/* 年份选择 */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 text-center">
              年份
            </h3>
            <div
              ref={yearContainerRef}
              className="h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 rounded-xl bg-muted/50"
            >
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={cn(
                    "w-full py-3 px-4 text-center transition-colors",
                    selectedYear === year
                      ? "bg-primary text-primary-foreground font-bold"
                      : "hover:bg-pink-light text-foreground"
                  )}
                >
                  {year}年
                </button>
              ))}
            </div>
          </div>

          {/* 月份选择 */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 text-center">
              月份
            </h3>
            <div className="h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 rounded-xl bg-muted/50">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={cn(
                    "w-full py-3 px-4 text-center transition-colors",
                    selectedMonth === month
                      ? "bg-primary text-primary-foreground font-bold"
                      : "hover:bg-pink-light text-foreground"
                  )}
                >
                  {month}月
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 按钮区 */}
        <div className="flex gap-3 p-4 border-t border-border">
          <Button
            variant="outline"
            className="flex-1 rounded-full"
            onClick={onClose}
          >
            取消
          </Button>
          <Button
            className="flex-1 rounded-full bg-primary hover:bg-primary/90"
            onClick={handleConfirm}
          >
            确定
          </Button>
        </div>
      </div>
    </div>
  );
}
