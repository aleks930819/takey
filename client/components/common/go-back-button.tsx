'use client';

import { cn } from '@/lib/utils';

import { useRouter } from 'next/navigation';

const GoBackButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <button
      aria-label="Go to previous page"
      onClick={() => router.back()}
      className={cn(
        'flex items-center gap-2 rounded-md bg-primary-dark px-4 py-2 font-bold uppercase text-white',
        className,
      )}
    >
      <span>&#8592;</span>
      Back
    </button>
  );
};

export default GoBackButton;
