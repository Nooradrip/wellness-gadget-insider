import { Metadata } from 'next';
import Link from 'next/link';
import SearchResults from '@/components/SearchResults';
import path from 'path';
import fs from 'fs/promises';

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

async function searchArticles(query: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'blog-articles.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format: expected an array of articles');
    }

    if (!query.trim()) {
      return [];
    }

    const normalizedQuery = query.toLowerCase();
    return data.map((article) => {
      let score = 0;
      const searchContent = `${article.pageTitle} ${article.metaDescription || ''} ${article.description || ''}`.toLowerCase();
      
      if (article.pageTitle.toLowerCase().includes(normalizedQuery)) score += 5;
      if (article.metaDescription?.toLowerCase().includes(normalizedQuery)) score += 3;
      if (article.description?.toLowerCase().includes(normalizedQuery)) score += 2;
      if (searchContent.includes(normalizedQuery)) score += 1;

      return {
        url: `/blog/${article.slug}`,
        title: article.pageTitle,
        description: article.metaDescription || article.description,
        breadcrumbs: article.breadcrumbs || '',
        score
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
    
  } catch (error: any) {
    console.error('Search error:', error.message);
    throw new Error("Search failed");
  }
}

export default async function SearchPage({ params }: PageProps) {
  const query = Array.isArray(params.query) 
    ? params.query[0] 
    : params.query || "";
  const decodedQuery = decodeURIComponent(query);
  const normalizedQuery = decodedQuery.toLowerCase();
  
  let results = [];
  let loading = false;
  let error: string | null = null;

  try {
    results = await searchArticles(normalizedQuery);
  } catch (err) {
    console.error('Search failed:', err);
    error = 'Failed to load search results. Please try again.';
  }

  return (
    <SearchResults 
      query={decodedQuery} 
      results={results} 
      loading={loading}
      error={error}
    />
  );
}