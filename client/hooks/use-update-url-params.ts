'use client';
import queryString from 'query-string';
import { useRouter } from 'next/navigation';

const useUpdateUrlParams = () => {
  const router = useRouter();

  const updateURL = ({ param, value }: { param: string; value: string }) => {
    const url = new URL(window.location.href);

    url.searchParams.set(param, value);

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

  return {
    updateURL,
  };
};

export default useUpdateUrlParams;
