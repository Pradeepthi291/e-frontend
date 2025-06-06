import { trackAction } from '@/utils/trackaction';

export default function BuyButton() {
  const handleClick = () => {
    trackAction("clicked:Buy");
  };

  return (
    <button onClick={handleClick} className="btn-primary">
      Buy
    </button>
  );
}
