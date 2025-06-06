import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  model: string;
  price: number;
  image: string;
  priority?: boolean;
}

export default function ProductCard({ id, model, price, image, priority }: ProductCardProps) {
  return (
    <Link 
      href={`/product/${id}`} 
      className="block h-full"
    >
      <div className="border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer h-full flex flex-col bg-white">
        <div className="relative w-full aspect-square flex-grow flex items-center justify-center bg-gray-50">
          <Image
            src={image}
            alt={model}
            width={200}
            height={200}
            priority={priority}
            className="object-contain"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{model}</h3>
          <p className="text-green-700 font-medium text-base">₹{price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}
