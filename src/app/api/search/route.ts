import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'blog-articles.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { articles } = JSON.parse(fileContents);

    const queryTerms = query.split(/\s+/).filter(term => term.length > 0);

    const scoredResults = articles.map(article => {
      let score = 0;
      const title = article.pageTitle.toLowerCase();
      const breadcrumbs = `${article.mainCategoryName} ${article.subCategoryName}`.toLowerCase();
      const description = article.description.toLowerCase();

      // Exact title match gets highest priority
      if (title.includes(query)) score += 100;
      
      // Individual term matches
      queryTerms.forEach(term => {
        // Title matches (high weight)
        if (title.includes(term)) score += 10;
        
        // Breadcrumb matches (medium weight)
        if (breadcrumbs.includes(term)) score += 5;
        
        // Description matches (low weight)
        if (description.includes(term)) score += 1;
      });

      return {
        ...article,
        score,
        url: `/blog/${article.slug}`,
        breadcrumbs: `${article.mainCategoryName} > ${article.subCategoryName}`
      };
    });

    // Filter out zero-score results and sort by score (descending)
    const results = scoredResults
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Search failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}