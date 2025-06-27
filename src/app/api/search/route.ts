import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Define base URL based on environment
const baseUrl = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000'
  : '';

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

    // Detailed debug: Find articles with "cat" in any field
    const catArticles = articles.filter(article => {
      const title = article.pageTitle.toLowerCase();
      const description = article.description.toLowerCase();
      const content = article.htmlBody.toLowerCase();
      return title.includes('cat') || description.includes('cat') || content.includes('cat');
    });
    
    console.log(`[Search API] Found ${catArticles.length} articles containing "cat"`);
    catArticles.forEach(article => {
      console.log(`- "${article.pageTitle}"`);
    });

    const queryTerms = query.split(/\s+/).filter(term => term.length > 0);
    console.log(`[Search API] Search terms:`, queryTerms);

    const scoredResults = articles.map(article => {
      let score = 0;
      const title = article.pageTitle.toLowerCase();
      const breadcrumbs = `${article.mainCategoryName} ${article.subCategoryName}`.toLowerCase();
      const description = article.description.toLowerCase();
      
      // Debug object to track scoring
      const scoreDetails: string[] = [];
      
      // 1. Exact title match (highest priority)
      if (title.includes(query)) {
        score += 100;
        scoreDetails.push(`Full query in title: +100`);
      }
      
      // 2. Individual term matches
      queryTerms.forEach(term => {
        // Title matches (high weight)
        if (title.includes(term)) {
          score += 10;
          scoreDetails.push(`"${term}" in title: +10`);
        }
        
        // Breadcrumb matches (medium weight)
        if (breadcrumbs.includes(term)) {
          score += 5;
          scoreDetails.push(`"${term}" in breadcrumbs: +5`);
        }
        
        // Description matches (low weight)
        if (description.includes(term)) {
          score += 1;
          scoreDetails.push(`"${term}" in description: +1`);
        }
      });

      return {
        ...article,
        score,
        url: `${baseUrl}/blog/${article.slug}`,
        breadcrumbs: `${article.mainCategoryName} > ${article.subCategoryName}`,
        // Add debug information
        _scoreDetails: scoreDetails
      };
    });

    // Filter and sort results
    const results = scoredResults
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    // Detailed debug output
    console.log(`[Search API] Found ${results.length} results for "${query}"`);
    if (results.length > 0) {
      console.log(`[Search API] Scoring details for top result (${results[0].pageTitle}):`);
      console.log(`- Score: ${results[0].score}`);
      console.log(`- Breakdown:`, results[0]._scoreDetails);
    }
    
    // Log all results with scores
    console.log(`[Search API] All results with scores:`);
    results.forEach(result => {
      console.log(`- ${result.pageTitle}: ${result.score} points`);
      if (result._scoreDetails.length > 0) {
        console.log(`  Breakdown: ${result._scoreDetails.join(', ')}`);
      }
    });
    
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