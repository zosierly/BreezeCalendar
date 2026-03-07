"use client";

import { ChevronLeft, Moon, Sun, Calendar, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useCalendar } from "@/lib/calendar-context";
import { cn } from "@/lib/utils";

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const { settings, updateSettings } = useCalendar();

  const settingsSections = [
    {
      title: "日期设置",
      items: [
        {
          id: "showLunar",
          label: "显示农历",
          description: "在日历中显示农历日期、节气和传统节日",
          icon: Calendar,
          value: settings.showLunar,
          onChange: (value: boolean) => updateSettings({ showLunar: value }),
        },
      ],
    },
    {
      title: "界面设置",
      items: [
        {
          id: "darkMode",
          label: "深色模式",
          description: "开启深色主题，保护眼睛",
          icon: settings.darkMode ? Moon : Sun,
          value: settings.darkMode,
          onChange: (value: boolean) =>
            updateSettings({ darkMode: value, followSystem: false }),
          disabled: settings.followSystem,
        },
        {
          id: "followSystem",
          label: "跟随系统",
          description: "自动跟随系统的深色/浅色模式设置",
          icon: Monitor,
          value: settings.followSystem,
          onChange: (value: boolean) => updateSettings({ followSystem: value }),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 顶部标题栏 */}
      <header className="sticky top-0 z-10 bg-card shadow-sm">
        <div className="max-w-md mx-auto flex items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full mr-3"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">设置</h1>
        </div>
      </header>

      {/* 设置内容 */}
      <main className="max-w-md mx-auto p-4 space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">
              {section.title}
            </h2>
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center justify-between p-4",
                      index !== section.items.length - 1 && "border-b border-border"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pink-light flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={item.value}
                      onCheckedChange={item.onChange}
                      disabled={item.disabled}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* 关于信息 */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">
            关于
          </h2>
          <div className="bg-card rounded-2xl shadow-sm p-4">
            <div className="text-center">
              <div className="text-4xl mb-2">📅</div>
              <h3 className="font-bold text-foreground">清风日历</h3>
              <p className="text-sm text-muted-foreground mt-1">版本 1.0.0</p>
              <p className="text-xs text-muted-foreground mt-3">
                一款简洁清新的日历应用
                <br />
                支持公历、农历、节气显示
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
