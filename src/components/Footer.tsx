// components/Footer.tsx
import React from 'react';
import { MapPinIcon, PhoneIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { FaInstagram } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('FooterSection');
  return (
    <footer className="text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Description */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{t('section1.title')}</h3>
          <p className="text-sm">
            {t('section1.description')}
          </p>
          {/* Social Media */}
          <div className="flex space-x-4 mt-4">
            <a href="https://www.instagram.com/cafeteria_imanis/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex">
              <FaInstagram className="w-6 h-6" />
              <span className="ml-2">{t('section1.instagramLink')}</span>
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">{t('section2.title')}</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2 text-primary" />
              {t('section2.address')}
            </li>
            <li className="flex items-center">
              <PhoneIcon className="w-5 h-5 mr-2 text-primary" />
              <a href="tel:+34967891234" className="hover:text-white">965 04 22 62</a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">{t('section3.title')}</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
              {t('section3.workingDays')}
            </li>
            <li className="pl-7">{t('section3.weekend')}</li>
            <li className="pl-7">{t('section3.dayOff')}</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {t('rightsReserved')}
      </div>
    </footer>
  );
}
