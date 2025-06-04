import { useEffect, useState } from 'react';
import { sendTrackingData } from '@/utils/sendTracking'; // add this import

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const products = [
  { id: 1, model: "Google Pixel 7", price: 35000, image: "/images/pixel7.jpg" },
  { id: 2, model: "Samsung Galaxy S23", price: 60000, image: "/images/galaxy-s23.jpg" },
  { id: 3, model: "Apple iPhone 15", price: 90000, image: "/images/iphone15.jpg" },
  { id: 4, model: "Xiaomi Mi 12", price: 30000, image: "/images/mi12.jpg" },
  { id: 5, model: "Motorola Edge 30", price: 28000, image: "/images/motorola-edge30.jpg" },
  { id: 6, model: "OnePlus 9 Pro", price: 45000, image: "/images/oneplus9pro.jpg" },
];

export default function BestDeals() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

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

    };

    window.addEventListener('beforeunload', sendTracking);

    return () => {
      window.removeEventListener('beforeunload', sendTracking);
    };
  }, []);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <aside className="w-1/4 border p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.includes("Apple")}
                onChange={() => toggleFilter("Apple")}
                className="cursor-pointer"
              />
              <span>Apple</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={selectedFilters.includes("Samsung")}
                onChange={() => toggleFilter("Samsung")}
                className="cursor-pointer"
              />
              <span>Samsung</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={selectedFilters.includes("Xiaomi")}
                onChange={() => toggleFilter("Xiaomi")}
                className="cursor-pointer"
              />
              <span>Xiaomi</span>
            </label>
          </div>
        </aside>

        <section className="w-3/4 grid grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              model={product.model}
              price={product.price}
              image={product.image}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
