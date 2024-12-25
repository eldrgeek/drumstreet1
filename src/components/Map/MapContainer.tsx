import React from 'react';

type MapContainerProps = {
  children: React.ReactNode;
};

export function MapContainer({ children }: MapContainerProps) {
  return (
    <div className="flex-1 relative w-full h-full">
      {children}
    </div>
  );
}