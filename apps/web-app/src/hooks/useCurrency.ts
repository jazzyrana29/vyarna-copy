import { useEffect, useState } from 'react';
import localeCurrency from 'locale-currency';

export function useCurrency(defaultCurrency: string = 'usd'): string {
  const [currency, setCurrency] = useState(defaultCurrency);

  // A (non-exhaustive) list of Stripe’s supported ISO 4217 codes in lowercase.
  // You can expand this to every currency Stripe supports:
  const STRIPE_SUPPORTED = new Set<string>([
    'aed',
    'ars',
    'aud',
    'bhd',
    'bnd',
    'brl',
    'cad',
    'chf',
    'clp',
    'cny',
    'cop',
    'czk',
    'dkk',
    'eur',
    'gbp',
    'hkd',
    'huf',
    'idr',
    'ils',
    'inr',
    'jpy',
    'krw',
    'mxn',
    'myr',
    'nok',
    'nzd',
    'php',
    'pkr',
    'pln',
    'rub',
    'sar',
    'sek',
    'sgd',
    'thb',
    'try',
    'twd',
    'uah',
    'vnd',
    'zar',
    'usd',
  ]);

  useEffect(() => {
    let isMounted = true;

    async function fetchCurrency() {
      try {
        // ➡️ fetch just the two-letter country code via a simple IP lookup
        const res = await fetch('https://ipapi.co/country/');
        if (!res.ok) throw new Error('IP lookup failed');
        const countryCode = (await res.text()).trim();

        // ➡️ map it to an ISO currency
        const raw = localeCurrency.getCurrency(countryCode) || defaultCurrency;
        const code = raw.toLowerCase();

        // ➡️ only accept it if Stripe actually supports it
        const final = STRIPE_SUPPORTED.has(code) ? code : defaultCurrency;

        if (isMounted) setCurrency(final);
      } catch {
        if (isMounted) setCurrency(defaultCurrency);
      }
    }

    fetchCurrency();
    return () => {
      isMounted = false;
    };
  }, [defaultCurrency]);

  return currency;
}
