'use client';

import React, { useState } from 'react';
import { ClientOnly } from '@/components/common';

type ToolTipPosition = 'top' | 'bottom' | 'left' | 'right';

interface ToolTipProps {
  children: React.ReactNode;
  tooltip?: string;
  position?: ToolTipPosition;
}

const ToolTip = ({ children, tooltip, position = 'left' }: ToolTipProps) => {
  const [show, setShow] = useState(false);

  const positionOfTheToolTip = () => {
    switch (position) {
      case 'top':
        return '-top-12';
      case 'bottom':
        return '-bottom-12';
      case 'left':
        return '-translate-x-full -translate-y-1/2 top-1/2';
      case 'right':
        return '-translate-x-full -translate-y-1/2 top-1/2';
    }
  };

  return (
    <ClientOnly>
      <div className=" relative z-10 flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
        <span
          className={`
          ${positionOfTheToolTip()}
          absolute z-[999] hidden  scale-0 rounded bg-primary-dark px-3 py-2 text-xs text-white transition-all lg:block
          ${show ? 'scale-100' : ''}
          `}
        >
          {tooltip}
        </span>
      </div>
    </ClientOnly>
  );
};

export default ToolTip;
