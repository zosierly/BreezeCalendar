"use client";

import { Calendar, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  currentPage: "calendar" | "settings";
  onNavigate: (page: "calendar" | "settings") => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    {
      id: "calendar" as const,
      label: "日历",
      icon: Calendar,
    },
    {
      id: "settings" as const,
      label: "设置",
      icon: Settings,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-6 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-6 w-6 transition-transform",
                  isActive && "scale-110"
                )}
              />
              <span
                className={cn(
                  "text-xs mt-1 font-medium",
                  isActive && "font-bold"
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-0 w-12 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
