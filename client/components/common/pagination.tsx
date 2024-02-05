'use client';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import qs from 'query-string';

const Pagination = ({ currentPage, totalPages }: { currentPage: number; totalPages: number | undefined }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const visibilePages = [];

  if (!totalPages) return null;

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    visibilePages.push(i);
  }

  // if there is only one page or no page at all, we don't need to show the pagination
  if (totalPages === 1 || totalPages === 0) {
    return null;
  }

  // extract the current url query params and convert it to an object
  // so we can update the page query and to keep the other query params
  const currentUrl = qs.parse(searchParams.toString());

  const constructNewUrl = (page: number) => {
    let newQuery = {
      ...currentUrl,
      page: page,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: newQuery,
      },
      { skipNull: true },
    );

    return url;
  };

  const handleNextPage = () => {
    if (Number(page) === totalPages) return;
    const url = constructNewUrl(Number(page) + 1);
    router.push(url);
  };

  const handlePrevPage = () => {
    if (Number(page) === 1) return;
    const url = constructNewUrl(Number(page) - 1);
    router.push(url);
  };

  const handlePage = (page: number) => {
    const url = constructNewUrl(page);
    router.push(url);
  };

  return (
    <nav className="mt-10 flex  items-center justify-center">
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={handlePrevPage}
        className="flex h-10 w-10 items-center justify-center disabled:opacity-50 "
      >
        <ChevronLeft size={30} />
      </button>
      {startPage > 1 && <span className="mx-1  mt-auto flex text-2xl text-black">...</span>}
      {visibilePages.map((page) => (
        <button
          key={page}
          type="button"
          aria-label={`Go to page ${page}`}
          className={`mx-2 h-10 w-10 rounded-sm  ${
            currentPage === page ? 'border border-primary-dark' : 'bg-primary-dark text-white'
          }`}
          onClick={() => handlePage(page)}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && <span className="mx-1 mt-auto  flex text-2xl  text-black">...</span>}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center disabled:bg-opacity-50 "
        onClick={handleNextPage}
      >
        <ChevronRight size={30} />
      </button>
    </nav>
  );
};

export default Pagination;
