import { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

interface LocationSearchProps {
  onLocationSelect: (lat: number, lon: number, name: string) => void;
  onUseCurrentLocation: () => void;
  isLoading?: boolean;
}

export function LocationSearch({ onLocationSelect, onUseCurrentLocation, isLoading }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    try {
      // Nominatim API (OpenStreetMap geocoding - FREE!)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(searchQuery)}` +
        `&format=json&limit=5`
      );
      
      const data = await response.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleResultClick = (result: any) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const name = result.display_name.split(',')[0]; // Just city name
    
    onLocationSelect(lat, lon, name);
    setShowResults(false);
    setSearchQuery('');
    setResults([]);
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search city or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
            className="pl-9"
          />
        </div>
        
        {/* Search Button */}
        <Button 
          onClick={searchLocation} 
          disabled={searching || !searchQuery.trim()}
          variant="secondary"
          size="icon"
        >
          {searching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
        
        {/* Use Current Location Button */}
        <Button 
          onClick={onUseCurrentLocation}
          disabled={isLoading}
          variant="outline"
          size="icon"
          title="Use my current location"
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleResultClick(result)}
              className="w-full text-left px-4 py-3 hover:bg-accent border-b last:border-b-0 transition-colors"
            >
              <div className="font-medium text-sm">{result.display_name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {result.lat.slice(0, 8)}, {result.lon.slice(0, 8)}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {showResults && results.length === 0 && !searching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg p-4 text-center text-sm text-muted-foreground">
          No locations found for "{searchQuery}"
        </div>
      )}
    </div>
  );
}