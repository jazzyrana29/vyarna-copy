import { useEffect, useState } from 'react';
import * as Localization from 'expo-localization';
import localeCurrency from 'locale-currency';

export function useCurrency(defaultCurrency = 'usd'): string {
  const [currency, setCurrency] = useState(defaultCurrency);

  useEffect(() => {
    try {
      const locale = Localization.locale ?? '';
      const cur = localeCurrency.getCurrency(locale) ?? defaultCurrency;
      setCurrency(String(cur).toLowerCase());
    } catch {
      setCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  return currency;
}
