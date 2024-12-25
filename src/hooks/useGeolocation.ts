import { useState, useCallback } from 'react';

type Location = {
  latitude: number;
  longitude: number;
};

type UseGeolocationReturn = {
  getCurrentLocation: () => Promise<Location | null>;
  isLoading: boolean;
  error: string | null;
};

export function useGeolocation(): UseGeolocationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback((): Promise<Location | null> => {
    return new Promise((resolve) => {
      setIsLoading(true);
      setError(null);

      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setIsLoading(false);
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLoading(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
          resolve(null);
        }
      );
    });
  }, []);

  return { getCurrentLocation, isLoading, error };
}