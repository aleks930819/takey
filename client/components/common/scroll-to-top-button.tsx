'use client';

import { ChevronUp } from 'lucide-react';
import { useWindowScroll } from '@uidotdev/usehooks';

const ScrollToTopButton = ({ scrollTo, isVisible }: { scrollTo?: any; isVisible?: boolean }) => {
  const scrollToTheTop = () => (scrollTo ? scrollTo() : window.scrollTo({ top: 0, behavior: 'smooth' }));

  const [{ y }] = useWindowScroll();

  return (
    <button
      onClick={scrollToTheTop}
      className={` hover:bg-primary-dark/60 bg-primary-dark group fixed bottom-10 right-0 z-20 rounded-sm px-4 py-2
      text-white shadow-xl transition-all duration-300 ease-in-out hover:text-white
      ${isVisible || y! >= 200 ? ' translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0'}
      `}
    >
      <ChevronUp size={32} className="text-white transition-all duration-300 ease-in-out group-hover:text-white" />
    </button>
  );
};

export default ScrollToTopButton;
