import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import BottomNav from '../components/BottomNav';
import { StoreMap } from '../components/Map/StoreMap';
import { MapContainer } from '../components/Map/MapContainer';
import { PageContainer } from '../components/Layout/PageContainer';
import { useGeolocation } from '../hooks/useGeolocation';
import { supabase } from '../lib/supabase';
import type { DrumStore } from '../types/supabase';

const DEFAULT_LOCATION = {
  latitude: 40.7128,
  longitude: -74.0060,
  zoom: 12
};

export default function SearchPage() {
  const [viewport, setViewport] = useState(DEFAULT_LOCATION);
  const [stores, setStores] = useState<DrumStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getCurrentLocation } = useGeolocation();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        await fetchStores();
        await initializeLocation();
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  async function initializeLocation() {
    const location = await getCurrentLocation();
    if (location) {
      setViewport(prev => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
    }
  }

  async function fetchStores() {
    const { data, error } = await supabase
      .from('drum_stores')
      .select('*');
    
    if (error) {
      console.error('Error fetching stores:', error);
      return;
    }

    setStores(data || []);
  }

  const handleSearch = (query: string) => {
    // Implement search functionality
  };

  const handleStoreClick = (store: DrumStore) => {
    setViewport(prev => ({
      ...prev,
      latitude: store.latitude,
      longitude: store.longitude,
      zoom: 15
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <PageContainer>
      <div className="p-4 bg-white shadow-sm z-10">
        <SearchBar 
          onSearch={handleSearch} 
          onLocationClick={initializeLocation} 
        />
      </div>
      
      <MapContainer>
        <StoreMap
          stores={stores}
          viewport={viewport}
          onViewportChange={setViewport}
          onStoreClick={handleStoreClick}
        />
      </MapContainer>

      <BottomNav />
    </PageContainer>
  );
}