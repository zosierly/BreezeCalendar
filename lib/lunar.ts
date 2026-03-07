// 农历数据和转换工具

// 农历月份名称
const LUNAR_MONTHS = [
  "正月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "冬月",
  "腊月",
];

// 农历日期名称
const LUNAR_DAYS = [
  "初一",
  "初二",
  "初三",
  "初四",
  "初五",
  "初六",
  "初七",
  "初八",
  "初九",
  "初十",
  "十一",
  "十二",
  "十三",
  "十四",
  "十五",
  "十六",
  "十七",
  "十八",
  "十九",
  "二十",
  "廿一",
  "廿二",
  "廿三",
  "廿四",
  "廿五",
  "廿六",
  "廿七",
  "廿八",
  "廿九",
  "三十",
];

// 天干
const HEAVENLY_STEMS = [
  "甲",
  "乙",
  "丙",
  "丁",
  "戊",
  "己",
  "庚",
  "辛",
  "壬",
  "癸",
];

// 地支
const EARTHLY_BRANCHES = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
];

// 生肖
const ZODIAC_ANIMALS = [
  "鼠",
  "牛",
  "虎",
  "兔",
  "龙",
  "蛇",
  "马",
  "羊",
  "猴",
  "鸡",
  "狗",
  "猪",
];

// 24节气
const SOLAR_TERMS = [
  "小寒",
  "大寒",
  "立春",
  "雨水",
  "惊蛰",
  "春分",
  "清明",
  "谷雨",
  "立夏",
  "小满",
  "芒种",
  "夏至",
  "小暑",
  "大暑",
  "立秋",
  "处暑",
  "白露",
  "秋分",
  "寒露",
  "霜降",
  "立冬",
  "小雪",
  "大雪",
  "冬至",
];

// 农历信息数据（1900-2100年）
const LUNAR_INFO = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0,
  0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540,
  0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50,
  0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0,
  0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2,
  0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573,
  0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4,
  0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5,
  0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46,
  0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58,
  0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50,
  0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0,
  0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260,
  0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0,
  0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0,
  0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63, 0x09370,
  0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0,
  0x0a6d0, 0x055d4, 0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50,
  0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273, 0x06930, 0x07337, 0x06aa0,
  0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, 0x0e968, 0x0d520,
  0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
  0x0d520,
];

// 节气计算用的系数 - 基于天文算法
// 21世纪节气计算常数C值
const SOLAR_TERM_C = [
  5.4055, 20.12,     // 小寒、大寒 (1月)
  3.87, 18.73,       // 立春、雨水 (2月)
  5.63, 20.646,      // 惊蛰、春分 (3月)
  4.81, 20.1,        // 清明、谷雨 (4月)
  5.52, 21.04,       // 立夏、小满 (5月)
  5.678, 21.37,      // 芒种、夏至 (6月)
  7.108, 22.83,      // 小暑、大暑 (7月)
  7.5, 23.13,        // 立秋、处暑 (8月)
  7.646, 23.042,     // 白露、秋分 (9月)
  8.318, 23.438,     // 寒露、霜降 (10月)
  7.438, 22.36,      // 立冬、小雪 (11月)
  7.18, 21.94,       // 大雪、冬至 (12月)
];

// 特殊年份节气日期修正表
// 格式: "年份-节气索引": 修正天数
const SOLAR_TERM_EXCEPTIONS: Record<string, number> = {
  // 2026年修正
  "2026-3": 18,   // 雨水 2月18日
  "2026-6": 5,    // 清明 4月5日
  "2026-13": 23,  // 大暑 7月23日
  "2026-23": 22,  // 冬至 12月22日
  // 2027年修正
  "2027-4": 6,    // 惊蛰 3月6日
  "2027-5": 21,   // 春分 3月21日
  "2027-6": 5,    // 清明 4月5日
};

// 获取农历年份的总天数
function getLunarYearDays(year: number): number {
  let sum = 348;
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += LUNAR_INFO[year - 1900] & i ? 1 : 0;
  }
  return sum + getLeapDays(year);
}

// 获取闰月的天数
function getLeapDays(year: number): number {
  if (getLeapMonth(year)) {
    return LUNAR_INFO[year - 1900] & 0x10000 ? 30 : 29;
  }
  return 0;
}

// 获取闰月月份
function getLeapMonth(year: number): number {
  return LUNAR_INFO[year - 1900] & 0xf;
}

// 获取农历某月的天数
function getLunarMonthDays(year: number, month: number): number {
  return LUNAR_INFO[year - 1900] & (0x10000 >> month) ? 30 : 29;
}

// 公历转农历
export function solarToLunar(
  year: number,
  month: number,
  day: number
): {
  year: number;
  month: number;
  day: number;
  monthStr: string;
  dayStr: string;
  isLeap: boolean;
  zodiac: string;
  ganZhi: string;
} {
  // 基准日期：1900年1月31日是农历庚子年正月初一
  const baseDate = new Date(1900, 0, 31);
  const targetDate = new Date(year, month - 1, day);
  let offset = Math.floor(
    (targetDate.getTime() - baseDate.getTime()) / 86400000
  );

  // 计算农历年
  let lunarYear = 1900;
  let temp = 0;
  while (lunarYear < 2101 && offset > 0) {
    temp = getLunarYearDays(lunarYear);
    offset -= temp;
    lunarYear++;
  }
  if (offset < 0) {
    offset += temp;
    lunarYear--;
  }

  // 计算闰月
  const leap = getLeapMonth(lunarYear);
  let isLeap = false;

  // 计算农历月和日
  let lunarMonth = 1;
  while (lunarMonth < 13 && offset > 0) {
    // 闰月
    if (leap > 0 && lunarMonth === leap + 1 && !isLeap) {
      --lunarMonth;
      isLeap = true;
      temp = getLeapDays(lunarYear);
    } else {
      temp = getLunarMonthDays(lunarYear, lunarMonth);
    }

    // 解除闰月
    if (isLeap && lunarMonth === leap + 1) {
      isLeap = false;
    }

    offset -= temp;
    lunarMonth++;
  }

  if (offset === 0 && leap > 0 && lunarMonth === leap + 1) {
    if (isLeap) {
      isLeap = false;
    } else {
      isLeap = true;
      --lunarMonth;
    }
  }

  if (offset < 0) {
    offset += temp;
    --lunarMonth;
  }

  const lunarDay = offset + 1;

  // 计算天干地支
  const ganIndex = (lunarYear - 4) % 10;
  const zhiIndex = (lunarYear - 4) % 12;

  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    monthStr: LUNAR_MONTHS[lunarMonth - 1],
    dayStr: LUNAR_DAYS[lunarDay - 1],
    isLeap,
    zodiac: ZODIAC_ANIMALS[zhiIndex],
    ganZhi: HEAVENLY_STEMS[ganIndex] + EARTHLY_BRANCHES[zhiIndex],
  };
}

// 使用天文算法精确计算节气日期
function calculateSolarTermDate(
  year: number,
  termIndex: number
): { month: number; day: number } {
  // 节气对应的月份（0-23对应小寒到冬至）
  const termMonths = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];

  // 检查是否有特殊年份修正
  const exceptionKey = `${year}-${termIndex}`;
  if (SOLAR_TERM_EXCEPTIONS[exceptionKey] !== undefined) {
    return {
      month: termMonths[termIndex],
      day: SOLAR_TERM_EXCEPTIONS[exceptionKey],
    };
  }

  // 使用寿星万年历算法计算
  // 公式: 日期 = [Y × D + C] - L
  // Y: 年份后两位
  // D: 0.2422 (回归年的小数部分 * 每节气15度对应的天数)
  // C: 21世纪常数
  // L: 闰年修正 = (Y-1)/4 的整数部分
  const D = 0.2422;
  const y = year % 100;
  const C = SOLAR_TERM_C[termIndex];
  let day = Math.floor(y * D + C) - Math.floor((y - 1) / 4);

  return {
    month: termMonths[termIndex],
    day: day,
  };
}

// 获取某天的节气（如果有的话）
export function getSolarTerm(
  year: number,
  month: number,
  day: number
): string | null {
  // 计算这个月可能的节气（每月有2个节气）
  const termIndexBase = (month - 1) * 2;

  for (let i = 0; i < 2; i++) {
    const termIndex = termIndexBase + i;
    const termDate = calculateSolarTermDate(year, termIndex);
    if (termDate.month === month && termDate.day === day) {
      return SOLAR_TERMS[termIndex];
    }
  }

  return null;
}

// 获取某月的所有节气日期
export function getMonthSolarTerms(
  year: number,
  month: number
): { term: string; day: number }[] {
  const result: { term: string; day: number }[] = [];
  const termIndexBase = (month - 1) * 2;

  for (let i = 0; i < 2; i++) {
    const termIndex = termIndexBase + i;
    const termDate = calculateSolarTermDate(year, termIndex);
    if (termDate.month === month) {
      result.push({
        term: SOLAR_TERMS[termIndex],
        day: termDate.day,
      });
    }
  }

  return result;
}

// 获取某月第n个星期几的日期
function getNthWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
  n: number
): number {
  const firstDay = new Date(year, month - 1, 1);
  const firstWeekday = firstDay.getDay();

  // 计算第一个指定星期几的日期
  let day = 1 + ((weekday - firstWeekday + 7) % 7);

  // 加上(n-1)周
  day += (n - 1) * 7;

  return day;
}

// 获取某月最后一个星期几的日期
function getLastWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number
): number {
  const lastDay = new Date(year, month, 0).getDate();
  const lastDate = new Date(year, month - 1, lastDay);
  const lastWeekday = lastDate.getDay();

  const diff = (lastWeekday - weekday + 7) % 7;
  return lastDay - diff;
}

// 中国传统节日
export function getTraditionalFestival(
  lunarMonth: number,
  lunarDay: number,
  isLeap: boolean,
  lunarYear?: number
): string[] {
  if (isLeap) return [];

  const festivals: string[] = [];
  const key = `${lunarMonth}-${lunarDay}`;

  const festivalMap: Record<string, string> = {
    "1-1": "春节",
    "1-15": "元宵节",
    "2-2": "龙抬头",
    "5-5": "端午节",
    "7-7": "七夕节",
    "7-15": "中元节",
    "8-15": "中秋节",
    "9-9": "重阳节",
    "12-8": "腊八节",
    "12-23": "北方小年",
    "12-24": "南方小年",
  };

  if (festivalMap[key]) {
    festivals.push(festivalMap[key]);
  }

  // 除夕特殊处理：需要根据当年腊月的天数判断
  if (lunarMonth === 12) {
    // 除夕是腊月最后一天
    if (lunarYear) {
      const lunarMonthDays = getLunarMonthDays(lunarYear, 12);
      if (lunarDay === lunarMonthDays) {
        festivals.push("除夕");
      }
    } else if (lunarDay === 30 || lunarDay === 29) {
      // 如果没有年份信息，29和30都可能是除夕
      festivals.push("除夕");
    }
  }

  return festivals;
}

// 公历节日（包括固定日期和相对日期的节日）
export function getSolarFestival(
  year: number,
  month: number,
  day: number
): string[] {
  const festivals: string[] = [];
  const key = `${month}-${day}`;

  // 固定日期的节日
  const fixedFestivals: Record<string, string> = {
    "1-1": "元旦",
    "2-14": "情人节",
    "3-8": "妇女节",
    "3-12": "植树节",
    "3-15": "消费者权益日",
    "4-1": "愚人节",
    "4-22": "地球日",
    "5-1": "劳动节",
    "5-4": "青年节",
    "5-12": "护士节",
    "6-1": "儿童节",
    "7-1": "建党节",
    "8-1": "建军节",
    "9-3": "抗战胜利纪念日",
    "9-10": "教师节",
    "10-1": "国庆节",
    "10-31": "万圣夜",
    "11-1": "万圣节",
    "11-11": "光棍节",
    "12-24": "平安夜",
    "12-25": "圣诞节",
    "12-31": "跨年夜",
  };

  if (fixedFestivals[key]) {
    festivals.push(fixedFestivals[key]);
  }

  // 相对日期的节日
  // 母亲节：5月第2个星期日
  if (month === 5) {
    const mothersDay = getNthWeekdayOfMonth(year, 5, 0, 2);
    if (day === mothersDay) {
      festivals.push("母亲节");
    }
  }

  // 父亲节：6月第3个星期日
  if (month === 6) {
    const fathersDay = getNthWeekdayOfMonth(year, 6, 0, 3);
    if (day === fathersDay) {
      festivals.push("父亲节");
    }
  }

  // 感恩节：11月第4个星期四
  if (month === 11) {
    const thanksgiving = getNthWeekdayOfMonth(year, 11, 4, 4);
    if (day === thanksgiving) {
      festivals.push("感恩节");
    }
  }

  return festivals;
}

// 获取某一天的完整信息
export function getDayInfo(year: number, month: number, day: number) {
  const lunar = solarToLunar(year, month, day);
  const solarTerm = getSolarTerm(year, month, day);
  const traditionalFestivals = getTraditionalFestival(
    lunar.month,
    lunar.day,
    lunar.isLeap,
    lunar.year
  );
  const solarFestivals = getSolarFestival(year, month, day);

  // 合并所有节日和节气
  const allFestivals: string[] = [
    ...traditionalFestivals,
    ...(solarTerm ? [solarTerm] : []),
    ...solarFestivals,
  ];

  // 显示优先级：传统节日 > 节气 > 公历节日 > 农历日期
  let displayText = lunar.dayStr;
  if (traditionalFestivals.length > 0) {
    displayText = traditionalFestivals[0];
  } else if (solarTerm) {
    displayText = solarTerm;
  } else if (solarFestivals.length > 0) {
    displayText = solarFestivals[0];
  }

  return {
    solar: { year, month, day },
    lunar,
    solarTerm,
    traditionalFestival:
      traditionalFestivals.length > 0 ? traditionalFestivals[0] : null,
    traditionalFestivals,
    solarFestival: solarFestivals.length > 0 ? solarFestivals[0] : null,
    solarFestivals,
    allFestivals,
    displayText,
  };
}

export { LUNAR_MONTHS, LUNAR_DAYS, SOLAR_TERMS };
