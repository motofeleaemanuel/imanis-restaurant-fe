"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations('HeroSection');
  const [showModal, setShowModal] = useState(false);
  const phone = "965 04 22 62";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setShowModal(false);
    } catch {}
  };

  return (
    <header className="relative w-full h-screen">
      <Image
        src="/images/restaurant.webp"
        alt="Restaurant interior"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-30" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl sm:text-3xl md:3xl font-bold text-white mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-white mb-6 max-w-7xl">
          {t('subtitle')}
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition"
        >
          {t('callToReserveButton')}
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          // backdrop
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            {/* modal content */}
            <motion.div
              className="bg-white rounded-lg p-6 w-11/12 max-w-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 text-[#222]">
                {t('modal.title')}
              </h2>
              <p className="mb-6 text-[#222]/60">{phone}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
                >
                  {t('modal.copyButton')}
                </button>
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition block sm:hidden"
                >
                  {t('modal.callNowButton')}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
