interface BuyButtonProps {
  onClick?: () => void;  // optional onClick prop
}

export default function BuyButton({ onClick }: BuyButtonProps) {
  return (
    <button
      onClick={onClick}  // pass onClick here
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Buy Now
    </button>
  );
}
