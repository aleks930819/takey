'use client';

import { useRestaurantIdState } from '@/lib/state';
import { usePathname } from 'next/navigation';
import React from 'react';

/**
 * @description This component is used to avoid the need to pass the restaurantId prop to every component that needs it.
 * It tracks the current restaurantId from the URL and sets it in the global state.
 * @returns null
 */
const TrackCurrentRestaurantId = () => {
  const pathname = usePathname();
  const setRestaurantId = useRestaurantIdState((state) => state.setRestaurantId);
  const restaurantId = pathname.split('/')[2];

  React.useEffect(() => {
    if (!pathname.includes('restaurant')) return;
    setRestaurantId(restaurantId);
  }, [pathname, restaurantId, setRestaurantId]);

  return null;
};

export default TrackCurrentRestaurantId;
