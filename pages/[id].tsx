import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BuyButton from '@/components/BuyButton';
import { trackAction } from '@/utils/trackaction';

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
  const product = products.find(p => p.id === Number(id));

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
          className="w-full max-w-md mb-4 object-contain"
        />
        <p className="text-xl font-semibold mb-6">Price: ₹{product.price.toLocaleString()}</p>

        <div className="flex space-x-4">
          <BuyButton
            onClick={() => trackAction('buy_clicked')}
          />
          <button
            onClick={() => trackAction('contact_seller_clicked')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Contact Seller
          </button>
          <button
            onClick={() => trackAction('save_clicked')}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Save
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
