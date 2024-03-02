'use client';

import Link from 'next/link';
import React from 'react';

import { setCookie } from 'cookies-next';

import { COOKIES_NAMES } from '@/constants';
import { useCookieConsent } from '@/contexts/cookies-consent-context';

import { ClientOnly } from '@/components/common';

const CookiesBanner = () => {
  const { isConsentGiven, giveConsent } = useCookieConsent();

  const acceptCookie = () => {
    setCookie(`${COOKIES_NAMES.LOCAL_CONSUMER}`, 'true', {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
    });

    giveConsent();
  };

  // No need to show the cookie consent if the user has already given consent
  if (isConsentGiven) {
    return null;
  }
  return (
    <ClientOnly>
      <div
        className="bg-gray-200 fixed
      bottom-0 z-50 flex  w-full justify-between
    text-black"
      >
        <p className="px-2 py-4">
          We use cookies to improve your experience on our website. By browsing this website, you agree to our use of
          cookies.
          <span>
            <Link href="/cookies-policy" className="ml-1 underline">
              Learn more
            </Link>
          </span>
        </p>
        <button
          aria-label="Accept cookies"
          onClick={acceptCookie}
          className="bg-primary-dark p-1 px-10 py-1 text-lg font-semibold uppercase text-white"
        >
          Accept
        </button>
      </div>
    </ClientOnly>
  );
};

export default CookiesBanner;
