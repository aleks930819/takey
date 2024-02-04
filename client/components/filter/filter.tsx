'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onClick = () => {
    const url = new URL(window.location.href);

    url.searchParams.set('ratingsAverage[lte]', '5');

    const searchParams = url.searchParams.toString();

    const query = queryString.stringify(
      {
        ...queryString.parse(searchParams),
      },
      {
        skipEmptyString: true,
        skipNull: true,
        encode: true,
      },
    );

    router.push(url.pathname + '?' + query);
  };
  return (
    <div>
      Filter by rating
      <button
        className="bg-white px-4 py-6 text-black"
        onClick={() => {
          onClick();
        }}
      >
        1
      </button>
    </div>
  );
};

export default Filter;
