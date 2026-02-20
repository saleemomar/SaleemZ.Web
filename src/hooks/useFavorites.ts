import { useState, useEffect } from 'react';
import type { POI } from '../types/poi';

const STORAGE_KEY = 'nearby-explorer-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<POI[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favorites]);

  const toggleFavorite = (poi: POI) => {
    setFavorites(prev => {
      const exists = prev.find(p => p.id === poi.id);
      if (exists) {
        // Remove from favorites
        return prev.filter(p => p.id !== poi.id);
      } else {
        // Add to favorites
        return [...prev, poi];
      }
    });
  };

  const isFavorite = (id: string): boolean => {
    return favorites.some(poi => poi.id === id);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}