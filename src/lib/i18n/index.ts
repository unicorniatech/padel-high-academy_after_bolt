import { esMX } from './es-MX';

export type Language = 'es-MX';
export type TranslationKey = keyof typeof esMX;

export const i18n = {
  currentLanguage: 'es-MX' as Language,
  translations: {
    'es-MX': esMX,
  },

  t(key: string, params?: Record<string, string>): string {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      value = value[k];
      if (!value) return key;
    }

    if (params) {
      return Object.entries(params).reduce(
        (str, [key, value]) => str.replace(`{${key}}`, value),
        value
      );
    }

    return value;
  },
  
  formatDate(date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string {
    const d = new Date(date);
    const formatter = new Intl.DateTimeFormat('es-MX', {
      ...(format === 'short' && { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      }),
      ...(format === 'long' && { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      ...(format === 'time' && { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      }),
    });
    return formatter.format(d);
  },

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  },

  formatNumber(number: number): string {
    return new Intl.NumberFormat('es-MX').format(number);
  }
};