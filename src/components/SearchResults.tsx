'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Search failed');
        setResults(await res.json());
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <div className="p-8 text-center">Searching...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Results for: <span className="text-blue-600">"{query}"</span>
      </h1>

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.url} className="p-4 border rounded-lg">
              <Link href={result.url} className="text-lg font-semibold text-blue-600 hover:underline">
                {result.title}
              </Link>
              {result.description && (
                <p className="text-gray-600 mt-1">{result.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No results found for "{query}"</p>
      )}
    </div>
  );
}