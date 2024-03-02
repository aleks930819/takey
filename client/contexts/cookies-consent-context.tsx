'use client';

import { getCookie } from 'cookies-next';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CookiesBanner } from '@/components';
import { COOKIES_NAMES } from '@/constants';

interface CookieConsentContextType {
  isConsentGiven: boolean;
  giveConsent: () => void;
  revokeConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function useCookieConsent(): CookieConsentContextType {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}

interface CookieConsentProviderProps {
  children: ReactNode;
}

function CookieConsentProvider({ children }: CookieConsentProviderProps): React.JSX.Element {
  const [isConsentGiven, setConsentGiven] = useState(false);

  const localConsent = getCookie(`${COOKIES_NAMES.LOCAL_CONSUMER}`);

  useEffect(() => {
    if (localConsent) {
      setConsentGiven(true);
    }
  }, [localConsent]);

  const giveConsent = () => {
    setConsentGiven(true);
  };

  const revokeConsent = () => {
    setConsentGiven(false);
  };

  return (
    <CookieConsentContext.Provider value={{ isConsentGiven, giveConsent, revokeConsent }}>
      {children}
      <CookiesBanner />
    </CookieConsentContext.Provider>
  );
}

export default CookieConsentProvider;
