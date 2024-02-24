import { MaxWidth } from '../common';

const BottomFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <MaxWidth>
      <p className="text-center text-sm text-heading  lg:text-base">
        &copy; {currentYear} Takey. All rights reserved.{' '}
      </p>
    </MaxWidth>
  );
};

export default BottomFooter;
