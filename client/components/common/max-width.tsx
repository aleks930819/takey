import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

const MaxWidth = ({ children, className }: PropsWithChildren<Props>) => {
  return <div className={cn('mx-auto max-w-6xl', className)}>{children}</div>;
};

export default MaxWidth;
