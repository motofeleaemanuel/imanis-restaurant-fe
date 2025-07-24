'use client';
import { useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { API_BASE_URL } from '@/utils/apiBaseUrl';
import { useSwipeable } from 'react-swipeable';
import React from 'react';

// Define the data type returned by the API
export type GalleryItem = {
  _id: string;
  description: string;
  imageURL: string;
};

// SWR fetcher
const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Failed to fetch gallery data');
  return res.json();
});

export default function GalleryPage() {
  const { data, error } = useSWR<GalleryItem[]>(`${API_BASE_URL}/api/v1/gallery`, fetcher, {
    revalidateOnFocus: false,
  });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Prevent background scroll when lightbox is open
  React.useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [lightboxIndex]);

  // Swipe handlers for lightbox
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setLightboxIndex(lightboxIndex !== null ? (lightboxIndex + 1) % (data?.length ?? 1) : 0),
    onSwipedRight: () => setLightboxIndex(lightboxIndex !== null ? (lightboxIndex - 1 + (data?.length ?? 1)) % (data?.length ?? 1) : 0),
    trackMouse: true,
  });

  if (error) {
    return (
      <main className="bg-[url('/images/soft-wallpaper.png')] flex items-center justify-center h-screen">
        <p className="text-red-500">Error loading gallery: {error.message}</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="bg-[url('/images/soft-wallpaper.png')] flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-14 w-14 text-primary" />
      </main>
    );
  }

  return (
    <main className="font-libre-baskerville bg-[url('/images/soft-wallpaper.png')] bg-black text-gray-100 py-16 px-4 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-50 mt-8">Gallery</h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.map((item, idx) => (
            <div
              key={item._id}
              className="cursor-pointer"
              onClick={() => setLightboxIndex(idx)}
            >
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={item.imageURL}
                  alt={item.description}
                  width={400}
                  height={300}
                  className="w-full h-60 object-cover transform hover:scale-105 transition"
                  loading="lazy"
                />
              </div>
              {/* <h3 className="mt-2 text-2xl font-bold text-primary">{item.description}</h3> */}
            </div>
          ))}
        </motion.div>

        {/* Lightbox Carousel */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50"
            >
              <button
                className="absolute top-5 right-5 text-white text-3xl z-50"
                onClick={() => setLightboxIndex(null)}
              >
                &times;
              </button>
              <button
                className="absolute left-5 text-white text-3xl z-50"
                onClick={() => setLightboxIndex((lightboxIndex - 1 + data.length) % data.length)}
              >
                ‹
              </button>
              <button
                className="absolute right-5 text-white text-3xl z-50"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % data.length)}
              >
                ›
              </button>

              {/* Swipeable wrapper for mobile navigation */}
              <div className="relative w-full max-w-3xl mx-auto overflow-hidden"
                {...swipeHandlers}
              >
                <motion.div
                  className="flex items-center"
                  initial={{ x: -lightboxIndex * 100 + '%' }}
                  animate={{ x: -lightboxIndex * 100 + '%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {data.map((item) => (
                    <div key={item._id} className="flex-shrink-0 w-full flex flex-col items-center">
                      <Image
                        src={item.imageURL}
                        alt={item.description}
                        width={1000}
                        height={600}
                        priority={true}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="rounded-2xl"
                      />
                      {/* <p className="mt-4 text-center text-gray-200 text-lg">{item.description}</p> */}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
