import { Metadata } from 'next';
import Link from 'next/link'; // Added this import

export async function generateMetadata({
  params,
}: {
  params: { query: string };
}): Promise<Metadata> {
  return {
    title: `Search: ${decodeURIComponent(params.query)} - Pet Gadget Insider`,
  };
}

export default async function SearchPage({
  params,
}: {
  params: { query: string };
}) {
  const query = decodeURIComponent(params.query);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent(query)}`);
  const results = await response.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Results for: <span className="text-blue-600">"{query}"</span>
        {results.length > 0 && (
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({results.length} matches)
          </span>
        )}
      </h1>

      {results.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p>No results found for "{query}". Try different keywords.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {results.map((result) => (
            <article key={result.url} className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {result.breadcrumbs}
                  </div>
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
                  <p className="text-gray-600 mb-2">{result.description}</p>
                </div>
                {/* Optional: Remove score display for production */}
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  Score: {result.score}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}