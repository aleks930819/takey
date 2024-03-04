import Link from 'next/link';

import logoImage from '@/public/images/openart-image_qPco7FOK_1709477157277_raw-removebg-preview.png';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={'/'} className={cn('relative inline-block', className)} data-testid="logo">
      <Image src={logoImage} alt="Takey Logo" fill className=" object-cover" />
    </Link>
  );
};

export default Logo;
