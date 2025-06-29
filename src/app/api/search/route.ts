import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Define base URL based on environment
const baseUrl = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000'
  : 'https://www.petgadgetinsider.com';

interface BlogArticle {
  isPreformatted: boolean;
  slug: string;
  mainCategorySlug: string;
  mainCategoryName: string;
  subCategorySlug: string;
  subCategoryName: string;
  pageTitle: string;
  titleTag: string;
  description: string;
  metaDescription: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  featuredImageHint: string;
  authorName: string;
  datePublished: string;
  dateModified: string;
  htmlBody: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  
  console.log(`[Search API] Received query: "${query}"`);

  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'blog-articles.json');
    console.log(`[Search API] Loading articles from: ${filePath}`);
    
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { articles } = JSON.parse(fileContents) as { articles: BlogArticle[] };
    
    console.log(`[Search API] Loaded ${articles.length} articles`);

    const queryTerms = query.split(/\s+/).filter(term => term.length > 0);
    console.log(`[Search API] Search terms:`, queryTerms);

    const scoredResults = articles.map(article => {
      let score = 0;
      const title = article.pageTitle.toLowerCase();
      const breadcrumbs = `${article.mainCategoryName} ${article.subCategoryName}`.toLowerCase();
      const description = article.description.toLowerCase();
      const metaDescription = article.metaDescription.toLowerCase();
      const htmlBody = article.htmlBody.toLowerCase();
      
      // 1. Exact title match (highest priority)
      if (title.includes(query)) {
        score += 100;
      }
      
      // 2. Individual term matches
      queryTerms.forEach(term => {
        // Title matches (high weight)
        if (title.includes(term)) {
          score += 10;
        }
        
        // Breadcrumb matches (medium weight)
        if (breadcrumbs.includes(term)) {
          score += 5;
        }
        
        // Description matches (low weight)
        if (description.includes(term) || metaDescription.includes(term)) {
          score += 1;
        }
        
        // Content matches (lowest weight)
        if (htmlBody.includes(term)) {
          score += 0.5;
        }
      });

      return {
        url: `${baseUrl}/blog/${article.slug}`,
        pageTitle: article.pageTitle,
        description: article.metaDescription || article.description,
        breadcrumbs: `${article.mainCategoryName} > ${article.subCategoryName}`,
        score: Math.round(score)
      };
    });

    // Filter and sort results
    const results = scoredResults
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    console.log(`[Search API] Found ${results.length} results for "${query}"`);
    
    return new NextResponse(JSON.stringify(results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('[Search API] Critical error:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: "Search failed", 
        details: error instanceof Error ? error.message : String(error) 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}