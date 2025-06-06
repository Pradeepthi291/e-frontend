// pages/product/[id].tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { sendTrackingData } from '@/utils/sendTracking';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BuyButton from '@/components/BuyButton';

const products = [
  { id: 1, model: "Google Pixel 7", price: 35000, image: "/images/pixel7.jpg" },
  { id: 2, model: "Samsung Galaxy S23", price: 60000, image: "/images/galaxy-s23.jpg" },
  { id: 3, model: "Apple iPhone 15", price: 90000, image: "/images/iphone15.jpg" },
  { id: 4, model: "Xiaomi Mi 12", price: 30000, image: "/images/mi12.jpg" },
  { id: 5, model: "Motorola Edge 30", price: 28000, image: "/images/motorola-edge30.jpg" },
  { id: 6, model: "OnePlus 9 Pro", price: 45000, image: "/images/oneplus9pro.jpg" },
];

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (!product) return;

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
  }, [product]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Product not found</h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{product.model}</h1>
        <img
          src={product.image}
          alt={product.model}
          className="w-full max-w-md mb-4"
        />
        <p className="text-xl font-semibold mb-6">Price: ₹{product.price}</p>
        <BuyButton />
      </main>
      <Footer />
    </>
  );
}
