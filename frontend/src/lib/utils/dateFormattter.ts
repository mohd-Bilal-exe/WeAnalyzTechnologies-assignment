type FormatDateOptions = {
  relative?: boolean;
  locale?: string;
};

export default function formatDate(
  input: Date | string | number,
  format: string = 'DD MMM',
  { relative = false, locale = 'en' }: FormatDateOptions = {}
): string {
  const date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date provided to formatDate()');
  }

  if (relative) {
    return formatRelative(date, locale);
  }

  const pad = (n: number): string => String(n).padStart(2, '0');

  const tokens: Record<string, string | number> = {
    YYYY: date.getFullYear(),
    YY: String(date.getFullYear()).slice(-2),
    MM: pad(date.getMonth() + 1),
    M: date.getMonth() + 1,
    DD: pad(date.getDate()),
    D: date.getDate(),
    HH: pad(date.getHours()),
    H: date.getHours(),
    mm: pad(date.getMinutes()),
    m: date.getMinutes(),
    ss: pad(date.getSeconds()),
    s: date.getSeconds(),
    MMM: date.toLocaleString(locale, { month: 'short' }),
    MMMM: date.toLocaleString(locale, { month: 'long' }),
  };

  return format.replace(/YYYY|YY|MMMM|MMM|MM|M|DD|D|HH|H|mm|m|ss|s/g, match =>
    String(tokens[match])
  );
}

function formatRelative(date: Date, locale: string): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const absDiff = Math.abs(diff);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const minutes = Math.round(diff / (1000 * 60));
  const hours = Math.round(diff / (1000 * 60 * 60));
  const days = Math.round(diff / (1000 * 60 * 60 * 24));
  const months = Math.round(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.round(diff / (1000 * 60 * 60 * 24 * 365));

  if (absDiff < 60 * 1000) return 'just now';
  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minute');
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour');
  if (Math.abs(days) < 30) return rtf.format(days, 'day');
  if (Math.abs(months) < 12) return rtf.format(months, 'month');
  return rtf.format(years, 'year');
}
