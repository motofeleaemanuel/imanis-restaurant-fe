'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import React from 'react';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale() as 'en' | 'es' | 'ro';
  const pathname = usePathname();                       
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  // Strip leading /{locale} to get the “base” path (or “/”)
  const withoutLocale = pathname.replace(/^\/(en|es|ro)/, '') || '/';
  // Find the routing key whose current‐locale value matches
  const pathKey =
    (Object.keys(routing.pathnames) as Array<keyof typeof routing.pathnames>).find((key) =>
      routing.pathnames[key][locale] === withoutLocale
    ) || '/';

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as 'en' | 'es' | 'ro';
    const newPath = routing.pathnames[pathKey as keyof typeof routing.pathnames]?.[newLocale] ?? '';
    const search = new URLSearchParams(query).toString();
    const url = `/${newLocale}${newPath}${search ? `?${search}` : ''}`;
    await router.push(url);
  };

  return (
    <select
      aria-label="Select language"
      value={locale}
      onChange={handleChange}
      className="
        block
        w-full
        max-w-xs
        bg-white
        border border-gray-300
        rounded-md
        py-2 px-3
        text-sm font-medium text-gray-700
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
        transition
        duration-200 ease-in-out
      "
    >
      <option value="en">EN</option>
      <option value="es">ES</option>
      <option value="ro">RO</option>
    </select>
  );
}
