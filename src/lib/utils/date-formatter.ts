import { i18n } from '@/lib/i18n';

export function formatDate(date: Date | string): string {
  return i18n.formatDate(date, 'long');
}

export function formatTime(date: Date | string): string {
  return i18n.formatDate(date, 'time');
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffInMinutes = Math.floor((now.getTime() - target.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) {
    if (diffInMinutes < 5) return i18n.t('dates.justNow');
    return i18n.t('dates.minutesAgo', { minutes: diffInMinutes.toString() });
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return i18n.t('dates.hoursAgo', { hours: diffInHours.toString() });
  }

  return formatDate(date);
}

export function formatCurrency(amount: number): string {
  return i18n.formatCurrency(amount);
}

export function formatNumber(number: number): string {
  return i18n.formatNumber(number);
}