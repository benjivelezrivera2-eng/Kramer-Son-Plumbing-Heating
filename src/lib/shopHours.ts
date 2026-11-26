import { business } from "../config/business";

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

type DenverParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekdayShort: (typeof WEEKDAY_SHORT)[number];
};

function denverParts(date: Date): DenverParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: business.shopHours.timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekdayShort = get("weekday") as DenverParts["weekdayShort"];

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    weekdayShort,
  };
}

function thanksgivingDay(year: number): number {
  // Fourth Thursday in November
  const nov1 = new Date(Date.UTC(year, 10, 1, 12, 0, 0));
  const dow = nov1.getUTCDay(); // 0 Sun … 4 Thu
  const firstThursday = 1 + ((4 - dow + 7) % 7);
  return firstThursday + 21;
}

export function isClosedHoliday(year: number, month: number, day: number): boolean {
  for (const holiday of business.closedHolidays) {
    if ("rule" in holiday && holiday.rule === "us-thanksgiving") {
      if (month === 11 && day === thanksgivingDay(year)) return true;
      continue;
    }
    if ("month" in holiday && holiday.month === month && holiday.day === day) {
      return true;
    }
  }
  return false;
}

function isWeekend(weekdayShort: string): boolean {
  return weekdayShort === "Sat" || weekdayShort === "Sun";
}

function pastClosing(parts: DenverParts): boolean {
  const { closeHour, closeMinute } = business.shopHours;
  return (
    parts.hour > closeHour ||
    (parts.hour === closeHour && parts.minute >= closeMinute)
  );
}

function ymdValue(year: number, month: number, day: number): string {
  return [
    year,
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");
}

function addCalendarDays(
  year: number,
  month: number,
  day: number,
  delta: number,
): { year: number; month: number; day: number } {
  // Noon UTC avoids DST edge cases when reading calendar day back in Denver
  const utc = new Date(Date.UTC(year, month - 1, day + delta, 18, 0, 0));
  const parts = denverParts(utc);
  return { year: parts.year, month: parts.month, day: parts.day };
}

function labelFor(year: number, month: number, day: number): string {
  const utc = new Date(Date.UTC(year, month - 1, day, 18, 0, 0));
  return utc.toLocaleDateString("en-US", {
    timeZone: business.shopHours.timezone,
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export type VisitDayOption = { value: string; label: string };

/**
 * Next 6 bookable weekdays in America/Denver shop hours.
 * Skips today after close, weekends, and closedHolidays (omitted, not greyed).
 * Call only on the client to avoid hydration drift.
 */
export function visitDayOptions(now = new Date()): VisitDayOption[] {
  const nowParts = denverParts(now);
  let cursor = {
    year: nowParts.year,
    month: nowParts.month,
    day: nowParts.day,
  };

  const startParts = denverParts(
    new Date(Date.UTC(cursor.year, cursor.month - 1, cursor.day, 18, 0, 0)),
  );

  const skipToday =
    pastClosing(nowParts) ||
    isWeekend(startParts.weekdayShort) ||
    isClosedHoliday(cursor.year, cursor.month, cursor.day);

  if (skipToday) {
    cursor = addCalendarDays(cursor.year, cursor.month, cursor.day, 1);
  }

  const options: VisitDayOption[] = [];
  let guard = 0;
  while (options.length < 6 && guard < 60) {
    guard += 1;
    const probe = denverParts(
      new Date(Date.UTC(cursor.year, cursor.month - 1, cursor.day, 18, 0, 0)),
    );
    const closed =
      isWeekend(probe.weekdayShort) ||
      isClosedHoliday(probe.year, probe.month, probe.day);

    if (!closed) {
      options.push({
        value: ymdValue(probe.year, probe.month, probe.day),
        label: labelFor(probe.year, probe.month, probe.day),
      });
    }
    cursor = addCalendarDays(cursor.year, cursor.month, cursor.day, 1);
  }

  return options;
}
