const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const currencyCompact = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatPHP(amount: number): string {
  return currency.format(amount);
}

export function formatPHPCompact(amount: number): string {
  return currencyCompact.format(amount);
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-PH");
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}

const dateLong = new Intl.DateTimeFormat("en-PH", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const dateShort = new Intl.DateTimeFormat("en-PH", {
  month: "short",
  day: "numeric",
});

const weekdayShort = new Intl.DateTimeFormat("en-PH", { weekday: "short" });

const weekdayLong = new Intl.DateTimeFormat("en-PH", { weekday: "long" });

const monthDay = new Intl.DateTimeFormat("en-PH", {
  month: "long",
  day: "numeric",
});

export function formatDateLong(date: Date): string {
  return dateLong.format(date);
}

export function formatDateShort(date: Date): string {
  return dateShort.format(date);
}

export function formatWeekdayShort(date: Date): string {
  return weekdayShort.format(date);
}

export function formatWeekdayLong(date: Date): string {
  return weekdayLong.format(date);
}

export function formatMonthDay(date: Date): string {
  return monthDay.format(date);
}

/** "7:30 AM" - schedule times are stored as plain strings in mock data. */
export function formatTime(hour: number, minute = 0): string {
  const suffix = hour < 12 ? "AM" : "PM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${minute.toString().padStart(2, "0")} ${suffix}`;
}
