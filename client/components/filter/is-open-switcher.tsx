'use client';

import React from 'react';
import { useUpdateUrlSearchParams } from '@/hooks';
import { useSearchParams } from 'next/navigation';

const IsOpenSwitcher = () => {
  const { updateURL } = useUpdateUrlSearchParams();

  const searchParams = useSearchParams();

  const paramValue = searchParams.get(`isClosed[eq]`);

  const handleOptionChange = () => {
    if (paramValue) {
      updateURL({ param: `isClosed[eq]`, value: '' });
      return;
    }
    updateURL({ param: `isClosed[eq]`, value: '1' });
  };

  return (
    <fieldset className="mb-2 flex w-full items-center justify-between pb-2">
      <label className="inline-flex w-full cursor-pointer items-center justify-between">
        <input
          type="checkbox"
          value={1}
          role="switch"
          className="peer sr-only"
          checked={paramValue === '1'}
          onChange={handleOptionChange}
        />
        <span className=" text-base font-bold text-heading ">Open Now</span>
        <div className="peer relative h-6 w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-dark peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-gray-400 rtl:peer-checked:after:-translate-x-full "></div>
      </label>
    </fieldset>
  );
};

export default IsOpenSwitcher;
