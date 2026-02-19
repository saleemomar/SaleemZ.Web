import { useState, useEffect, useCallback } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import type { Location } from '../types/poi';

interface GeolocationState {
  location: Location | null;
  error: string | null;
  loading: boolean;
  locationName?: string;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: true,
    locationName: undefined,
  });

  // Function to manually set location
  const setManualLocation = useCallback((lat: number, lon: number, name?: string) => {
    setState({
      location: { lat, lon },
      error: null,
      loading: false,
      locationName: name,
    });
    console.log(`📍 Location set to: ${name || 'Unknown'} (${lat}, ${lon})`);
  }, []);

  const getCurrentPosition = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const permStatus = await Geolocation.checkPermissions();
      
      if (permStatus.location === 'denied') {
        const requestResult = await Geolocation.requestPermissions();
        if (requestResult.location === 'denied') {
          throw new Error('Location permission denied. Please enable location services.');
        }
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      setState({
        location: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
        error: null,
        loading: false,
        locationName: 'Current Location',
      });
      
      console.log('📍 Using GPS location');
    } catch (err) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setState({
              location: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              },
              error: null,
              loading: false,
              locationName: 'Current Location',
            });
            console.log('📍 Using browser geolocation');
          },
          (error) => {
            setState({
              location: null,
              error: error.message || 'Failed to get location',
              loading: false,
            });
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        setState({
          location: null,
          error: err instanceof Error ? err.message : 'Failed to get location',
          loading: false,
        });
      }
    }
  }, []);

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  return { 
  location: state.location,
  error: state.error,
  loading: state.loading,
  locationName: state.locationName,  // ← Explicit
  refresh: getCurrentPosition,
  setManualLocation,
};
}