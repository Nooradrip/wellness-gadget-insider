// components/SearchResults.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        
        if (!res.ok) {
          throw new Error(await res.text());
        }
        
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to load search results. Please try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim()) {
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2">Searching for "{query}"...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-primary">"{query}"</span>
      </h1>

      {results.length > 0 ? (
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.url} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <Link href={result.url} className="block">
                <h2 className="text-xl font-semibold text-primary hover:underline">
                  {result.title}
                </h2>
                {result.description && (
                  <p className="text-gray-600 mt-2">{result.description}</p>
                )}
                <div className="mt-2 text-sm text-gray-400">
                  {new URL(result.url, window.location.origin).pathname}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg">
            No results found for <span className="font-semibold">"{query}"</span>
          </p>
          <p className="text-gray-500 mt-2">
            Try different keywords or check your spelling
          </p>
        </div>
      )}
    </div>
  );
}