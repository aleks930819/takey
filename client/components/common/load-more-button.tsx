'use client';

import { useUpdateUrlSearchParams } from '@/hooks';
import { useSearchParams } from 'next/navigation';

const LoadMoreButton = () => {
  const searchParams = useSearchParams();
  const { updateURL } = useUpdateUrlSearchParams();

  const page = searchParams.get('page');

  if (!page) return null;

  return (
    <button
      onClick={() => updateURL({ param: page?.toString(), value: (parseInt(page) + 1).toString() })}
      className="rounded-md bg-primary-dark px-4 py-2 font-bold uppercase text-white"
    >
      Load More
    </button>
  );
};

export default LoadMoreButton;
