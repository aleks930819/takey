'use client';

import qs from 'query-string';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui';

const filterOptions = ['ratingsAverage[lte]', 'deliveryTime[lte]', 'minOrderPrice[lte]', 'sort'];

const ClearFiltersButton = () => {
  const router = useRouter();
  const pathanme = usePathname();
  const searchparams = useSearchParams();

  const currentUrl = qs.parse(searchparams.toString());

  const clearFilters = () => {
    filterOptions.forEach((option) => {
      delete currentUrl[option];
    });

    const url = qs.stringifyUrl(
      {
        url: pathanme,
        query: currentUrl,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  const isDisabled = Object.keys(currentUrl).filter((key) => filterOptions.includes(key)).length === 0;

  return (
    <Button onClick={clearFilters} className="w-full" disabled={isDisabled}>
      Clear Filters
    </Button>
  );
};

export default ClearFiltersButton;
