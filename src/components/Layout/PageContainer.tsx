import React from 'react';

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="flex flex-col min-h-screen h-screen overflow-hidden">
      {children}
    </div>
  );
}