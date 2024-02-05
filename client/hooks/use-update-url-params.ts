'use client';
import queryString from 'query-string';
import { useRouter } from 'next/navigation';

/**
 * Custom hook for updating URL parameters.
 * @returns An object with the `updateURL` function.
 */
const useUpdateUrlParams = () => {
  const router = useRouter();

  /**
   * Updates the URL with a new parameter value.
   * @param param The parameter to update.
   * @param value The new value for the parameter.
   */
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
