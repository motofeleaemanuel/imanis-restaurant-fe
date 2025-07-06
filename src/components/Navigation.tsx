'use client';

import { routing } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Logo from './Logo';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Determine the “base” route key for routing.pathnames
  const withoutLocale = pathname.replace(/^\/(en|es|ro)/, '') || '/';
  const foundKey = Object.keys(routing.pathnames).find(
    key =>
      (routing.pathnames[key as keyof typeof routing.pathnames] as Record<string, string>)[
        locale
      ] === withoutLocale
  ) as keyof typeof routing.pathnames | undefined;
  const pathKey: keyof typeof routing.pathnames = foundKey ?? '/';

  const handleLocaleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const newPath =
      routing.pathnames[pathKey]?.
        [newLocale as keyof typeof routing.pathnames[typeof pathKey]] ?? '';
    const search = new URLSearchParams(query).toString();
    const url = `/${newLocale}${newPath}${search ? `?${search}` : ''}`;
    await router.push(url);
  };

  const menuItems = [
    { path: '', label: t('home') },
    { path: 'menu', label: t('menu') },
    { path: 'gallery', label: t('gallery') },
  ].map(item => ({
    href: { pathname: `/${locale}/${item.path}`, query },
    label: item.label,
  }));

  return (
    <header className="top-0 left-0 w-full z-50 bg-[#333]/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href={{ pathname: `/${locale}`, query }} className="text-2xl font-sans font-bold text-white hover:text-gray-200 transition">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map(item => (
            <Link
              key={item.href.pathname}
              href={item.href}
              className="relative text-xl font-medium text-white hover:text-primary transition group"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <select
            aria-label="Change language"
            value={locale}
            onChange={handleLocaleChange}
            className="block w-20 bg-[#333]/80 backdrop-blur-md rounded-lg py-2 px-3 text-sm font-medium text-primary shadow-sm focus:outline-none transition duration-200"
          >
            <option className='bg-[#333]' value="en">EN</option>
            <option className='bg-[#333]' value="es">ES</option>
            <option className='bg-[#333]' value="ro">RO</option>
          </select>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-white hover:text-primary transition"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(prev => !prev)}
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <nav className="md:hidden bg-[#333]/90 backdrop-blur-md">
          <ul className="flex flex-col space-y-4 px-4 py-6">
            {menuItems.map(item => (
              <li key={item.href.pathname}>
                <Link
                  href={item.href}
                  className="block text-lg font-medium text-white hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
