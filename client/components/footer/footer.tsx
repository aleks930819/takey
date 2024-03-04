import { getNavigation } from '@/actions/navigation';

import { MaxWidth, PaddingContainer, SpaceContainer } from '@/components/common';

import BottomFooter from './bottom-footer';
import FooterNavigation from './footer-links';

import * as actions from '@/actions/cuisine';

const Footer = async () => {
  const navigation = await getNavigation('footer');
  const cuisines = await actions.getAllCuisines();

  return (
    <div className="mt-auto border-t border-gray-300  py-6">
      <PaddingContainer>
        <footer>
          <MaxWidth>
            <FooterNavigation navigation={navigation} cuisines={cuisines.data.cuisines} />
          </MaxWidth>
          <SpaceContainer variant="medium" />
          <BottomFooter />
        </footer>
      </PaddingContainer>
    </div>
  );
};

export default Footer;
