// components/TestimonialCarousel.tsx
'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useTranslations } from 'next-intl';

interface Testimonial {
  quote: string;
  author: string;
  rating: number; // 1-5 stars
}

const testimonials: Testimonial[] = [
  { quote: "Best coffee in town—cozy vibe and friendly staff!", author: "— María G.", rating: 5 },
  { quote: "The avocado toast is a revelation. Can’t wait to come back!", author: "— Carlos R.", rating: 4 },
  { quote: "Amazing pastries and so many vegan options!", author: "— Lucia M.", rating: 5 },
  { quote: "Perfect spot for a lazy Sunday brunch with friends.", author: "— Javier L.", rating: 5 },
  { quote: "The staff is so welcoming, it feels like home.", author: "— Ana S.", rating: 4 },
  { quote: "Their seasonal specials are always a treat!", author: "— Diego P.", rating: 5 },
  { quote: "I love the atmosphere here, perfect for working or relaxing.", author: "— Elena T.", rating: 4 },
  { quote: "The coffee art is almost too beautiful to drink!", author: "— Sofia B.", rating: 5 },
];

// Helper to render stars
function renderStars(count: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-5 h-5 ${i <= count ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.374-2.455a1 1 0 00-1.176 0l-3.374 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.96a1 1 0 00-.364-1.118L2.063 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
      </svg>
    );
  }
  return <div className="flex justify-center mb-4">{stars}</div>;
}

export default function TestimonialCarousel() {
  const t = useTranslations('TestimonialsSection');
  return (
    <div className="bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{t('title')}</h2>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
        speed={3000}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{ paddingBottom: '2rem' }}
      >
        {testimonials.map((testimonial, i) => (
          <SwiperSlide key={i}>
            <blockquote className="h-full p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between">
              {renderStars(testimonial.rating)}
              <p className="text-lg italic text-gray-800 mb-4">&ldquo;{t('testimonial' + (i + 1) + '.quote')}&rdquo;</p>
              <footer className="mt-4 font-semibold text-right text-gray-400">{t('testimonial' + (i + 1) + '.author')}</footer>
            </blockquote>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
