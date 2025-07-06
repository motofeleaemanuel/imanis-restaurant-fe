'use client';
import { Locale, useTranslations } from 'next-intl';
import { use, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import useSWR from 'swr';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { placeholderURL } from '@/utils/cloudinaryImages';

interface MenuItemRaw {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  allergens?: string[];
  category: string;
  subcategory?: string;
  price?: number;
  order: number;
  imageURL?: string;
  imagePublicId?: string;
  sizeOptions?: { name: string; price: number }[];
}

interface MenuPageProps {
  params: Promise<{ locale: Locale }>;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function MenuPage({ params }: MenuPageProps) {
  const t = useTranslations('MenuPage');
  const { locale } = use(params);

  const { data, error } = useSWR<{ dishes: MenuItemRaw[]; drinks: MenuItemRaw[] }>(
    'https://imanis-restaurant-be.onrender.com/api/v1/menu',
    fetcher
  );

  const [tab, setTab] = useState<'Dishes' | 'Desserts' | 'Drinks'>('Dishes');

  if (error) return <p className="text-red-500 p-4">{t('error')}</p>;
  if (!data) {
    return (
      <div className="flex justify-center items-center py-16 h-screen">
        <Loader2 className="animate-spin h-14 w-14 text-primary" />
      </div>
    );
  }

  // parsing helpers
  const parseRecord = (s?: string) => { try { return JSON.parse(s || '{}'); } catch { return {}; } };
  const parseList = (arr?: string[]) => arr?.flatMap(s => { try { return JSON.parse(s); } catch { return []; } }) ?? [];

  // build dishes
  const allDishes = data.dishes.map(r => {
    const nameMap = parseRecord(r.name) as Record<string, string>;
    const descMap = parseRecord(r.description) as Record<string, string>;
    const catMap = parseRecord(r.category) as Record<string, string>;
    const ings = parseList(r.ingredients).map((o: Record<string, string>) => o[locale] || '');
    return {
      id: r.id,
      name: nameMap[locale] || '',
      description: descMap[locale] || '',
      category: catMap[locale] || '',
      price: r.price || 0,
      imageURL: r.imageURL,
      imagePublicId: r.imagePublicId,
      ingredients: ings,
    };
  });

  // split desserts vs other dishes
  const desserts = allDishes.filter(d => d.category.toLowerCase() === t('dessertsTab').toLowerCase());
  const dishes = allDishes.filter(d => d.category.toLowerCase() !== t('dessertsTab').toLowerCase());

  // build drinks
  const drinks = data.drinks.map(r => {
    const nameMap = parseRecord(r.name) as Record<string, string>;
    const descMap = parseRecord(r.description) as Record<string, string>;
    const catMap = parseRecord(r.category) as Record<string, string>;
    const subMap = parseRecord(r.subcategory) as Record<string, string>;
    const sizeOpts = (r.sizeOptions || []).map(o => ({ name: parseRecord(o.name) as Record<string, string>, price: o.price }));
    return {
      id: r.id,
      name: nameMap[locale] || '',
      description: descMap[locale] || '',
      category: catMap[locale] || '',
      subcategory: (subMap[locale] || '') === '-' ? '' : (subMap[locale] || ''),
      price: r.price,
      imageURL: r.imageURL,
      imagePublicId: r.imagePublicId,
      sizeOptions: sizeOpts,
    };
  });

  const groupBy = <T extends { category: string }>(arr: T[]) =>
    arr.reduce((acc: Record<string, T[]>, x) => {
      acc[x.category] = (acc[x.category] || []).concat(x);
      return acc;
    }, {} as Record<string, T[]>);

  const groupedDishes = groupBy(dishes);
  const groupedDesserts = groupBy(desserts);
  const groupedDrinks = groupBy(drinks);

  return (
    <main className="bg-[url('/images/soft-wallpaper.png')] text-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 mt-12">{t('title')}</h1>

        <div className="relative mb-12">
          <div className="flex justify-center space-x-4">
            {(['Dishes', 'Desserts', 'Drinks'] as const).map(val => (
              <button
                key={val}
                onClick={() => setTab(val)}
                className={`relative px-4 py-2 font-semibold ${
                  tab === val
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t(`${val.toLowerCase()}Tab`)}

                {/* only render this under the active item */}
                {tab === val && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-1 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Pane */}
        {tab === 'Dishes' &&
          Object.entries(groupedDishes).map(([cat, items]) => (
            <section key={cat} className="mb-16">
              <h2 className="text-3xl font-semibold mb-6">{cat}</h2>
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row items-center mb-12 ${
                    i % 2 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {item.imageURL && (
                    <div
                      className={`md:w-1/2 w-full rounded-2xl overflow-hidden shadow-lg ${
                        i % 2 ? 'md:ml-6' : 'md:mr-6'
                      }`}
                    >
                       <Image
            src={item.imageURL}
            alt={item.name}
            width={600}
            height={400}
            priority={i === 0 || i === 1} // prioritize first two images
            loading={i < 2 ? 'eager' : 'lazy'}
            blurDataURL={placeholderURL(item.imagePublicId || '')}
            className="w-full h-72 object-cover hover:scale-105 transition"
          />
                    </div>
                  )}
                  <div className="md:w-1/2 w-full bg-[#333]/70 p-6 rounded-2xl mt-6 md:mt-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-gray-200">{item.name}</h3>
                      <span className="text-xl text-primary font-semibold">€{item.price.toFixed(2)}</span>
                    </div>
                    {item.description && item.description !== '-' && (
                      <p className="mb-4 text-gray-300">{item.description}</p>
                    )}
                    {item.ingredients.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.ingredients.map((ing, j) => (
                          <span
                            key={j}
                            className="text-xs bg-primary/20 px-2 py-1 rounded text-primary"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          ))}

        {/* Desserts Pane */}
        {tab === 'Desserts' &&
          Object.entries(groupedDesserts).map(([cat, items]) => (
            <section key={cat} className="mb-16">
              <h2 className="text-3xl font-semibold mb-6">{cat}</h2>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="mb-8 bg-[#333]/70 p-6 rounded-lg flex justify-between items-center"
                >
                  <h3 className="text-2xl font-bold text-gray-200">{item.name}</h3>
                  <span className="text-lg text-primary font-semibold">€{item.price.toFixed(2)}</span>
                </div>
              ))}
            </section>
          ))}

        {/* Drinks Pane */}
        {tab === 'Drinks' &&
          Object.entries(groupedDrinks).map(([cat, items]) => (
            <section key={cat} className="mb-16">
              <h2 className="text-3xl font-semibold mb-6">{cat}</h2>
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row items-center mb-12 ${
                    i % 2 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {item.imageURL && (
                    <div
                      className={`md:w-1/2 w-full rounded-2xl overflow-hidden shadow-lg ${
                        i % 2 ? 'ml-6' : 'mr-6'
                      }`}
                    >
                      <Image
                        src={item.imageURL}
                        alt={item.name}
                        width={600}
                        height={400}
                        priority={true}
                        className="w-full h-72 object-cover hover:scale-105 transition"
                      />
                    </div>
                  )}
                  <div className="md:w-1/2 w-full bg-[#333]/70 p-6 rounded-2xl mt-6 md:mt-0">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-200">{item.name}</h3>
                        {item.subcategory && (
                          <p className="text-sm text-gray-400">{item.subcategory}</p>
                        )}
                      </div>
                      <span className="text-xl text-primary font-semibold">
                        {item.sizeOptions && item.sizeOptions.length > 0
                          ? item.sizeOptions
                              .map(o => `€${o.price.toFixed(2)}`)
                              .join(' / ')
                          : `€${item.price!.toFixed(2)}`}
                      </span>
                    </div>
                    {item.description && item.description !== '-' && (
                      <p className="text-gray-300">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </section>
          ))}
      </div>
    </main>
  );
}