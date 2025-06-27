import { Metadata } from 'next';
import Link from 'next/link';

type PageProps = {
  params: { query: string | string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const query = Array.isArray(params.query) 
    ? params.query[0] 
    : params.query || "";
  const decodedQuery = decodeURIComponent(query);
  
  return {
    title: `Search: ${decodedQuery} - Pet Gadget Insider`,
    description: `Search results for "${decodedQuery}" on Pet Gadget Insider`,
    openGraph: {
      title: `Search: ${decodedQuery} - Pet Gadget Insider`,
      description: `Find the best pet gadgets related to ${decodedQuery}`,
    },
    twitter: {
      title: `Search: ${decodedQuery} - Pet Gadget Insider`,
      description: `Discover pet gadgets for ${decodedQuery}`,
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function SearchPage({ params }: PageProps) {
  const query = Array.isArray(params.query) 
    ? params.query[0] 
    : params.query || "";
  const decodedQuery = decodeURIComponent(query);
  
  // Normalize query for case-insensitive search
  const normalizedQuery = decodedQuery.toLowerCase();
  
  // DEBUG: Log the query we're searching for
  console.log(`[SearchPage] Searching for: "${normalizedQuery}"`);
  
  // Safely fetch search results
  let results = [];
  try {
    // Use direct API path to avoid routing conflicts
    const apiUrl = `${process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : ''}/api/search?q=${encodeURIComponent(normalizedQuery)}`;
    
    console.log(`[SearchPage] Calling API: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 },
      cache: 'no-store' // Bypass cache to get fresh results
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Search API failed with status ${response.status}: ${errorText}`);
    }
    
    results = await response.json();
    console.log(`[SearchPage] Found ${results.length} results`);
    if (results.length > 0) {
      console.log('[SearchPage] First result:', {
        title: results[0].pageTitle,
        score: results[0].score,
        url: results[0].url
      });
    }
  } catch (error) {
    console.error('Search failed:', error);
    // Fallback to empty results on error
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Results for: <span className="text-blue-600">"{decodedQuery}"</span>
        {results.length > 0 && (
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({results.length} matches)
          </span>
        )}
      </h1>

      {results.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p>No results found for "{decodedQuery}". Try different keywords.</p>
          <div className="mt-4">
            <Link href="/blog" className="text-blue-600 hover:underline">
              Browse all articles
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {results.map((result: any) => (
            <article key={result.url} className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  {result.breadcrumbs && (
                    <div className="text-sm text-gray-500 mb-1">
                      {result.breadcrumbs}
                    </div>
                  )}
                  <h2 className="text-xl font-semibold mb-2">
                    <Link href={result.url} className="text-blue-600 hover:underline">
                      {result.pageTitle}
                      {result.score >= 100 && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Exact match
                        </span>
                      )}
                    </Link>
                  </h2>
                  {result.description && (
                    <p className="text-gray-600 mb-2">{result.description}</p>
                  )}
                </div>
                {process.env.NODE_ENV === 'development' && (
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    Score: {result.score}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}