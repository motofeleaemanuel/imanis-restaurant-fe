// app/(locale)/page.tsx
import React from 'react';
import Image from 'next/image';
// import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import TestimonialCarousel from '@/components/Testimonial';
import { Revealer } from '@/components/Revealer';
import Hero from '@/components/Hero';


export default function HomePage() {
  // const t = useTranslations('HomePage');

  const popularDishes = [
    { src: '/images/dish1.webp', alt: 'Espresso Delight', name: 'Espresso Delight', desc: 'Rich, bold espresso shot to kickstart your day.', price: '€2.50' },
    { src: '/images/dish2.webp', alt: 'Avocado Toast', name: 'Avocado Toast', desc: 'Smashed avocado on crusty sourdough, topped with chili flakes.', price: '€6.00' },
    { src: '/images/dish3.webp', alt: 'Berry Pancakes', name: 'Berry Pancakes', desc: 'Fluffy pancakes loaded with fresh berries and maple syrup.', price: '€8.00' },
    { src: '/images/dish4.webp', alt: 'Classic Latte', name: 'Classic Latte', desc: 'Smooth latte with a perfect layer of foam.', price: '€4.00' }
  ];

  const galleryImages = [
    '/images/restaurant1.webp',
    '/images/restaurant2.jpg',
    '/images/restaurant3.webp',
    '/images/restaurant.webp',
    '/images/restaurant2.jpg',
    '/images/restaurant1.webp'
  ];



  return (
    <>
      {/* Hero section with background image */}
      <Hero/>

      {/* Main content */}
      <main className="relative z-10">
        {/* About Section */}
        <Revealer>
          <section id="about" className="py-20 px-6 bg-gray-50">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image Card */}
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/restaurant.webp"
                  alt="Interior of Imanis Cafeteria"
                  width={800}
                  height={500}
                  className="w-full h-96 object-cover"
                  loading='lazy'
                />
              </div>

              {/* Text Content */}
              <div className="space-y-8">
                 <h2 className="text-5xl font-bold text-black leading-tight">
            About Us
          </h2>
          <p className="text-lg text-gray-600">
            Since opening our doors in <time dateTime="2023">2023</time>, Imanis Cafeteria has become a beloved gathering spot in <strong className="text-black">Calp, Spain</strong>. Nestled between sun-kissed beaches and charming streets, we blend a chic Mediterranean vibe with warm hospitality.
          </p>
          <p className="text-lg text-gray-600">
            Savor our signature <em className="text-black">Espresso Delight</em> or explore our seasonal specialties, all handcrafted by skilled baristas and bakers using the finest local ingredients for an authentic Spanish taste.
          </p>
              </div>
            </div>
          </section>
        </Revealer>
        <Revealer>
        <section id="home" className="relative py-16 px-4 overflow-hidden">
 <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl"></div>
            <div className="absolute -top-16 -right-16 w-96 h-96 bg-primary/20 rounded-full filter blur-2xl"></div>
  <div className="relative z-10 max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-2 text-gray-50">Popular Dishes</h2>
    <p className="text-center text-gray-100 mb-4">
      Discover our chef’s top picks, crafted with seasonal ingredients and served fresh daily.
    </p>

    {/* See Menu Link above grid */}
    <div className="w-full flex justify-end mb-2">
      <Link
        href="/menu"
        className="inline-flex items-center text-primary font-semibold hover:text-primary transition"
      >
        See Menu
        <svg
          className="w-5 h-5 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </div>

    {/* Dishes Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {popularDishes.map((dish) => (
        <div
          key={dish.name}
          className="bg-[#222]/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-primary hover:shadow-sm transition"
        >
          <Image
            src={dish.src}
            alt={dish.alt}
            width={400}
            height={300}
            sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
            loading='lazy'
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2 text-gray-50">{dish.name}</h3>
          <p className="text-sm text-gray-300 mb-2">{dish.desc}</p>
          <span className="text-lg font-bold text-primary">{dish.price}</span>
        </div>
      ))}
    </div>
  </div>
</section>
        </Revealer>

        {/* Testimonials Section */}
        <Revealer>
          <section id="testimonials" className="relative overflow-hidden py-16 bg-gray-50">
            <TestimonialCarousel />
          </section>
        </Revealer>

        <Revealer>
          {/* Gallery Section */}
          <section id="gallery" className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4 text-gray-50">Gallery</h2>
              <p className="text-center text-gray-50 mb-8">A glimpse into our cozy interior and mouthwatering dishes.</p>
              <div className='w-full flex justify-end mb-2'>
                <Link
                  href="/gallery"
                  className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition"
                >
                  See Gallery
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((src, idx) => (
                  <div key={idx} className="overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={src}
                      alt={`Gallery image ${idx + 1}`}
                      width={400}
                      height={300}
                      loading='lazy'
                      className="w-full h-60 object-cover transform hover:scale-105 transition"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Revealer>

        {/* <section id="location" className="py-16 w-full bg-gray-50">
  <div className="">
    <h2 className="max-w-7xl mx-auto text-4xl font-bold text-center mb-8 text-black">Find Us</h2>
    <div className="h-96 w-full rounded-lg overflow-hidden">
      <LocationMap />
    </div>
  </div>
</section> */}
      </main>
    </>
  );
}
