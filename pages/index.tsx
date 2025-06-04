'use client';

import { useEffect } from 'react';
import * as UAParser from 'ua-parser-js';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

import { sendTrackingData } from '@/utils/sendTracking'; // add this import

const products = [
  { id: 1, model: "Google Pixel 7", price: 35000, image: "/images/pixel7.jpg" },
  { id: 2, model: "Samsung Galaxy S23", price: 60000, image: "/images/galaxy-s23.jpg" },
  { id: 3, model: "Apple iPhone 15", price: 90000, image: "/images/iphone15.jpg" },
  { id: 4, model: "Xiaomi Mi 12", price: 30000, image: "/images/mi12.jpg" },
  { id: 5, model: "Motorola Edge 30", price: 28000, image: "/images/motorola-edge30.jpg" },
  { id: 6, model: "OnePlus 9 Pro", price: 45000, image: "/images/oneplus9pro.jpg" },
];

export default function Home() {
  useEffect(() => {
    const start = Date.now();

    const sendTracking = () => {
      const duration = Date.now() - start;
      const scrollY = window.scrollY;

      sendTrackingData([{
  page: window.location.pathname,
  timeSpent: duration,
  scrollDepth: scrollY,
  actions: ['page:visit'],
  timestamp: new Date().toISOString(),
}]);
    }

    window.addEventListener('beforeunload', sendTracking);

    return () => {
      window.removeEventListener('beforeunload', sendTracking);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to ORU Phones</h1>
        <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto w-full !important">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              model={product.model}
              price={product.price}
              image={product.image}
              priority={index < 3}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
