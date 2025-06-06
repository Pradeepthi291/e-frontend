import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const products = [
  { id: 1, model: "Google Pixel 7", price: 35000, image: "/images/pixel7.jpg", seller: "John Doe", location: "Jones Grove", phoneNumber: "9876543210" },
  { id: 2, model: "Samsung Galaxy S23", price: 60000, image: "/images/galaxy-s23.jpg", seller: "Jane Smith", location: "Sunset Blvd", phoneNumber: "9876501234" },
  { id: 3, model: "Apple iPhone 15", price: 90000, image: "/images/iphone15.jpg", seller: "Alice Johnson", location: "Downtown Ave", phoneNumber: "9876506789" },
  { id: 4, model: "Xiaomi Mi 12", price: 30000, image: "/images/mi12.jpg", seller: "Bob Anderson", location: "Green Valley", phoneNumber: "9876504321" },
  { id: 5, model: "Motorola Edge 30", price: 28000, image: "/images/motorola-edge30.jpg", seller: "Charlie Evans", location: "Lakeside Drive", phoneNumber: "9876507890" },
  { id: 6, model: "OnePlus 9 Pro", price: 45000, image: "/images/oneplus9pro.jpg", seller: "David Miller", location: "Oak Street", phoneNumber: "9876509876" },
];

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((p) => p.id === Number(id));

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
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Product Image */}
          <div className="w-full md:w-[300px] bg-white p-4 border rounded shadow">
  <Image
    src={product.image}
    alt={product.model}
    width={300}
    height={300}
    className="object-contain mx-auto"
  />
</div>


          {/* Product Details */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{product.model}</h1>
            <p className="text-xl text-green-700 font-semibold">
              ₹{product.price.toLocaleString()}
            </p>

            <div className="space-y-1 text-gray-700">
              <p><strong>Seller:</strong> {product.seller}</p>
              <p><strong>Location:</strong> {product.location}</p>
              <p><strong>Phone Number:</strong> {product.phoneNumber}</p>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Buy Now
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
                Contact Seller
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
                Save
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
