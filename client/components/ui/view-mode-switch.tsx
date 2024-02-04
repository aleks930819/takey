'use client';

import { useSearchParams } from 'next/navigation';
import { LayoutGrid, AlignJustify } from 'lucide-react';
import ToolTip from './tooltip';

const ViewModeSwitch = () => {
  const searchParams = useSearchParams();

  const view = searchParams.get('view') ?? 'grid';

  return (
    <div className="flex items-center justify-start gap-2">
      <ToolTip tooltip="Grid" position="bottom">
        <button
          type="button"
          className={` ${view === 'grid' ? 'text-black' : 'text-gray-5'} `}
          aria-label="Grid view"
          // onClick={() => handleViewModeChange('grid')}
        >
          <LayoutGrid size={25} />
        </button>
      </ToolTip>
      <ToolTip tooltip="List" position="bottom">
        <button
          type="button"
          className={` ${view === 'list' ? 'text-black' : 'text-gray-5'} `}
          aria-label="List view"
          // onClick={() => handleViewModeChange('list')}
        >
          <AlignJustify size={25} />
        </button>
      </ToolTip>
    </div>
  );
};

export default ViewModeSwitch;
