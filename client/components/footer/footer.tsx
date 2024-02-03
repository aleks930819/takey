import { MaxWidth } from '../common';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-primary-dark mt-auto py-6">
      <footer>
        <MaxWidth>
          <p className="text-heading text-sm lg:text-base  text-center">&copy; {currentYear} Takey. All rights reserved. </p>
        </MaxWidth>
      </footer>
    </div>
  );
};

export default Footer;
