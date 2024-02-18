import { TrackCurrentRestaurantId } from '@/components';
import React from 'react';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster
        toastOptions={{
          position: 'bottom-center',
        }}
      />
      <TrackCurrentRestaurantId />
      {children}
    </>
  );
}
