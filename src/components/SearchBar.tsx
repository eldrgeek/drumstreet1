import React from 'react';
import { Search, MapPin } from 'lucide-react';

type SearchBarProps = {
  onSearch: (query: string) => void;
  onLocationClick: () => void;
};

export default function SearchBar({ onSearch, onLocationClick }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search drum stores..."
          className="w-full pl-10 pr-12 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <button
          onClick={onLocationClick}
          className="absolute right-2 top-1.5 p-1 rounded-full hover:bg-gray-100"
        >
          <MapPin className="h-5 w-5 text-blue-500" />
        </button>
      </div>
    </div>
  );
}