import React from 'react';
import Map, { MapRef } from 'react-map-gl';
import { StoreMarker } from './StoreMarker';
import type { DrumStore } from '../../types/supabase';
import 'mapbox-gl/dist/mapbox-gl.css';

type ViewState = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type StoreMapProps = {
  stores: DrumStore[];
  viewport: ViewState;
  onViewportChange: (viewport: ViewState) => void;
  onStoreClick?: (store: DrumStore) => void;
};

export function StoreMap({ stores, viewport, onViewportChange, onStoreClick }: StoreMapProps) {
  const mapRef = React.useRef<MapRef>(null);

  return (
    <Map
      ref={mapRef}
      initialViewState={viewport}
      style={{ width: '100%', height: '100%' }}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      onMove={evt => onViewportChange(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      attributionControl={true}
      reuseMaps
    >
      {stores.map((store) => (
        <StoreMarker 
          key={store.id} 
          store={store} 
          onClick={onStoreClick}
        />
      ))}
    </Map>
  );
}