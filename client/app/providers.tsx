import React from 'react';
import { Toaster } from 'react-hot-toast';
import { CookieConsentProvider } from '@/contexts';

import { TrackCurrentRestaurantId } from '@/components';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CookieConsentProvider>
        <Toaster
          toastOptions={{
            position: 'bottom-center',
          }}
        />
        <TrackCurrentRestaurantId />
        {children}
      </CookieConsentProvider>
    </>
  );
}
