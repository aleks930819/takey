import { getNavigation } from '@/actions/navigation';

import { MaxWidth, SpaceContainer } from '@/components/common';

import BottomFooter from './bottom-footer';
import FooterNavigation from './footer-links';

const Footer = async () => {
  const navigation = await getNavigation('footer');

  return (
    <div className="mt-auto border-t border-gray-300  py-6">
      <footer>
        <MaxWidth>
          <FooterNavigation navigation={navigation} />
        </MaxWidth>
        <SpaceContainer variant="xsmall" />
        <BottomFooter />
      </footer>
    </div>
  );
};

export default Footer;
