import { Product } from '@/lib/api/types';

type LocaleConfig = {
  nameKey: 'uk' | 'us';
  priceKey: 'gbp' | 'usd';
  currency: string;
  intlLocale: string;
};

const localeConfigs: Record<string, LocaleConfig> = {
  uk: { nameKey: 'uk', priceKey: 'gbp', currency: 'GBP', intlLocale: 'en-GB' },
  us: { nameKey: 'us', priceKey: 'usd', currency: 'USD', intlLocale: 'en-US' },
};

export function getLocaleConfig(locale: string): LocaleConfig {
  return localeConfigs[locale] ?? localeConfigs.uk;
}

export function getProductName(product: Product, locale: string): string {
  const { nameKey } = getLocaleConfig(locale);
  return product.name[nameKey];
}

export function getProductPrice(product: Product, locale: string): number {
  const { priceKey } = getLocaleConfig(locale);
  return product.price[priceKey];
}

export function formatPrice(price: number, locale: string): string {
  const { currency, intlLocale } = getLocaleConfig(locale);
  return new Intl.NumberFormat(intlLocale, {
    style: 'currency',
    currency,
  }).format(price);
}
