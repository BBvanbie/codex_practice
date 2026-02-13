const DAY_MS = 24 * 60 * 60 * 1000;

export const toDateOnly = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const todayDateOnly = (): Date => toDateOnly(new Date());

export const addDays = (base: Date, days: number): Date =>
  new Date(toDateOnly(base).getTime() + days * DAY_MS);

export const parseYmdToDate = (ymd: string): Date => {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const formatYmdSlash = (ymd: string): string => ymd.replaceAll("-", "/");

export const formatEpochYmdSlash = (epoch: number): string => {
  const d = new Date(epoch);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
};

export const compareDateOnly = (a: Date, b: Date): number =>
  toDateOnly(a).getTime() - toDateOnly(b).getTime();
