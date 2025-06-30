'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!query.trim()) {
          setResults([]);
          setLoading(false);
          return;
        }

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

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
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
              <div className="flex justify-between items-start">
                <div>
                  {result.breadcrumbs && (
                    <div className="text-sm text-gray-500 mb-1">
                      {result.breadcrumbs}
                    </div>
                  )}
                  <Link href={result.url} className="block">
                    <h2 className="text-xl font-semibold text-primary hover:underline">
                      {result.title}
                    </h2>
                  </Link>
                </div>
                
                {/* Score display with visual indicator */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 mr-2">
                      Relevance:
                    </span>
                    <div className="relative w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-green-500"
                        style={{ width: `${Math.min(100, result.score * 5)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-gray-900">
                      {result.score.toFixed(1)} points
                    </span>
                    {result.score >= 8 && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Top Match
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {result.description && (
                <p className="text-gray-600 mt-2">{result.description}</p>
              )}
              
              {/* Score breakdown tooltip */}
              <div className="mt-3 text-xs text-gray-500">
                <details className="inline-block">
                  <summary className="cursor-pointer text-blue-600 hover:underline">
                    How is this score calculated?
                  </summary>
                  <div className="mt-1 p-2 bg-gray-50 rounded-md">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Title match: <span className="font-medium">6 points</span></li>
                      <li>Meta description match: <span className="font-medium">4 points</span></li>
                      <li>Content match: <span className="font-medium">2 points</span></li>
                      <li>Recent article: <span className="font-medium">+3 bonus</span></li>
                      <li>Category match: <span className="font-medium">+3 bonus</span></li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p>No results found for "{query}". Try different keywords.</p>
          <div className="mt-4">
            <Link href="/blog" className="text-blue-600 hover:underline">
              Browse all articles
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}