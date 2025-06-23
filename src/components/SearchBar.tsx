'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsLoading(true);
      try {
        router.push(`/search/${encodeURIComponent(query.trim())}`);
      } catch (error) {
        console.error("Navigation error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search pet products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          aria-label="Search"
        >
          {isLoading ? (
            <span className="loading-spinner h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent animate-spin" />
          ) : (
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 hover:text-blue-500" />
          )}
        </button>
      </div>
    </form>
  );
}