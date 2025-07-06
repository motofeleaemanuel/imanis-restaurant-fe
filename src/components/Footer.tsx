// components/Footer.tsx
import React from 'react';
import { Link } from '@/i18n/navigation';
import { MapPinIcon, PhoneIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Imanis Cafeteria</h3>
          <p className="text-sm">
            A cozy spot serving artisanal coffee, fresh pastries,
            and homemade treats. Join us for a relaxing experience.
          </p>
          {/* Social Media */}
          <div className="flex space-x-4 mt-4">
            <a href="https://www.instagram.com/cafeteria_imanis/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex">
              <FaInstagram className="w-6 h-6" />
              <span className="ml-2">Imanis Cafeteria</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
          <nav className="space-y-1 text-sm">
            <Link href="/menu" className="hover:text-white block">Menu</Link>
            <Link href="/menu" className="hover:text-white block">Reserve</Link>
            <Link href="/menu" className="hover:text-white block">About Us</Link>
            <Link href="/menu" className="hover:text-white block">Contact</Link>
          </nav>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2 text-primary" />
              Av. Rosa de los Vientos, 4, 03710 Calp, Alicante
            </li>
            <li className="flex items-center">
              <PhoneIcon className="w-5 h-5 mr-2 text-primary" />
              <a href="tel:+34967891234" className="hover:text-white">965 04 22 62</a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Opening Hours</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
              Mon – Fri: 8:00 AM – 8:00 PM
            </li>
            <li className="pl-7">Sat: 9:00 AM – 10:00 PM</li>
            <li className="pl-7">Sun: 9:00 AM – 6:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Imanis Cafeteria. All rights reserved.
      </div>
    </footer>
  );
}
