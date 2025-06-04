import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-3xl font-bold font-serif text-gray-900 tracking-wide hover:text-blue-700 transition"
        >
          ORU Phones
        </Link>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <Link href="/">
            <button className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm">
              Home
            </button>
          </Link>

          <Link href="/best-deals">
            <button className="px-5 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition shadow-sm">
              Best Deals
            </button>
          </Link>

          <Link href="/product-info">
            <button className="px-5 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition shadow-sm">
              Product Info
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
