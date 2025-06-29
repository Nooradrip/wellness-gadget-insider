import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';
import Fuse from 'fuse.js';

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

export default function SearchPage({ params }: PageProps) {
  const query = Array.isArray(params.query) 
    ? params.query[0] 
    : params.query || "";
  const decodedQuery = decodeURIComponent(query);
  
  // Normalize query for case-insensitive search
  const normalizedQuery = decodedQuery.toLowerCase();
  
  // Get all blog posts
  const articles = getAllBlogPosts();
  
  // Configure search
  const fuseOptions = {
    keys: ['pageTitle', 'description', 'metaDescription', 'mainCategoryName', 'subCategoryName'],
    threshold: 0.4,
    minMatchCharLength: 2,
    includeScore: true
  };
  
  const fuse = new Fuse(articles, fuseOptions);
  const searchResults = normalizedQuery ? fuse.search(normalizedQuery) : [];
  
  // Map to expected results format
  const results = searchResults.map(({ item, score }) => ({
    url: `/blog/${item.slug}`,
    pageTitle: item.pageTitle,
    description: item.metaDescription || item.description,
    breadcrumbs: `${item.mainCategoryName} > ${item.subCategoryName}`,
    score: Math.round((1 - (score || 0)) * 100)
  }));

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
          {results.map((result) => (
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