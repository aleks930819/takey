import { cn } from '@/lib/utils';
import React from 'react';

const PaddingContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('px-4 lg:px-0', className)}>{children}</div>;
};

export default PaddingContainer;
