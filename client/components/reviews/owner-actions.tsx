'use client';

import { Pen, Trash } from 'lucide-react';
import React from 'react';

const OwnerActionButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  return (
    <button className="flex items-center gap-2 text-sm" onClick={onClick}>
      {children}
    </button>
  );
};

const OwnerActions = () => {
  return (
    <div className="flex items-center gap-2">
      <OwnerActionButton onClick={() => {}}>
        <Pen size={18} />
        <span>Edit</span>
      </OwnerActionButton>
      <OwnerActionButton onClick={() => {}}>
        <Trash size={18} />
        <span>Delete</span>
      </OwnerActionButton>
    </div>
  );
};

export default OwnerActions;
