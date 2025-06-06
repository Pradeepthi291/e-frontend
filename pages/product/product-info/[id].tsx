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
console.log(router.query)
  const product = products.find(p => p.id === Number(id));
console.log(products)
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
        <p className="text-xl font-semibold mb-6">
          Price: ₹{product.price.toLocaleString()}
        </p>
      </main>
      <Footer />
    </>
  );
}
