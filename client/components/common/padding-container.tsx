import React from 'react';

const PaddingContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-4 lg:px-0">{children}</div>;
};

export default PaddingContainer;
