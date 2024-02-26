import { MaxWidth, SpaceContainer } from '@/components/common';
import { Check } from 'lucide-react';

const SuccessOrderPage = async () => {
  return (
    <MaxWidth className="flex flex-col items-center justify-center gap-2">
      <SpaceContainer />
      <h1 className="flex items-center gap-2 text-xl tracking-wide text-gray-600 lg:text-2xl">
        Your order has been placed
        <span className=" flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
          <Check size={19} />
        </span>
      </h1>
      <h2 className="text-lg tracking-wider text-gray-600 lg:text-xl">
        <strong>Thank you for choosing us!</strong>
      </h2>
    </MaxWidth>
  );
};

export default SuccessOrderPage;
