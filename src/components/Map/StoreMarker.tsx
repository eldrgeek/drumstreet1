import React from 'react';
import { Marker } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import type { DrumStore } from '../../types/supabase';

type StoreMarkerProps = {
  store: DrumStore;
  onClick?: (store: DrumStore) => void;
};

export function StoreMarker({ store, onClick }: StoreMarkerProps) {
  return (
    <Marker
      key={store.id}
      latitude={store.latitude}
      longitude={store.longitude}
    >
      <div 
        className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
        onClick={() => onClick?.(store)}
      >
        <MapPin className="h-6 w-6" />
      </div>
    </Marker>
  );
}