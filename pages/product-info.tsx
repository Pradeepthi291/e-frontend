import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { sendTrackingData } from '@/utils/sendTracking';
import { trackAction } from '@/utils/trackaction';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
          <h1 className="text-3xl font-bold text-red-600">Product not found</h1>
        </main>
        <Footer />
      </>
    );
  }

  // ✅ Handler functions for button clicks
  const handleBuyClick = () => {
    trackAction("clicked:Buy");
    alert("Buy button clicked!");
  };

  const handleContactClick = () => {
    trackAction("clicked:ContactSeller");
    alert("Contact Seller button clicked!");
  };

  const handleSaveClick = () => {
    trackAction("clicked:Save");
    alert("Product saved!");
  };

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.model}
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{product.model}</h1>
            <p className="text-2xl text-green-700 font-semibold mb-6">₹{product.price.toLocaleString()}</p>

            <div className="flex flex-wrap gap-4">
              <button onClick={handleBuyClick} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">Buy</button>
              <button onClick={handleContactClick} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Contact Seller</button>
              <button onClick={handleSaveClick} className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">Save</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
