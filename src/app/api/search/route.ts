import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase().trim() || '';
  
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'blog-articles.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    // Handle both single object and array formats
    let articles = [];
    if (Array.isArray(data)) {
      articles = data;
    } else if (typeof data === 'object' && data !== null) {
      articles = [data];
    } else {
      throw new Error('Invalid data format: Expected object or array of articles');
    }

    if (!query) {
      return NextResponse.json([]);
    }

    // Split query into individual words for partial matching
    const queryWords = query.split(/\s+/).filter(word => word.length > 0);
    
    const results = articles
      .filter(article => article && article.slug)
      .map((article) => {
        let score = 0;
        const title = article.pageTitle?.toLowerCase() || '';
        const metaDesc = article.metaDescription?.toLowerCase() || '';
        const description = article.description?.toLowerCase() || '';
        const allContent = `${title} ${metaDesc} ${description}`;

        // Calculate score for each query word
        queryWords.forEach(word => {
          // Exact match bonus
          const exactMatchRegex = new RegExp(`\\b${word}\\b`, 'i');
          
          // Title matches
          if (title.includes(word)) {
            score += 5;
            if (exactMatchRegex.test(title)) score += 2;
          }
          
          // Meta description matches
          if (metaDesc.includes(word)) {
            score += 3;
            if (exactMatchRegex.test(metaDesc)) score += 1;
          }
          
          // Description matches
          if (description.includes(word)) {
            score += 2;
            if (exactMatchRegex.test(description)) score += 1;
          }
          
          // Any content matches
          if (allContent.includes(word)) {
            score += 1;
          }
        });

        return {
          url: `/blog/${article.slug}`,
          title: article.pageTitle,
          description: article.metaDescription || article.description,
          breadcrumbs: article.mainCategoryName || article.mainCategorySlug || '',
          score
        };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20); // Increase limit to 20

    return NextResponse.json(results);
    
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json(
      { 
        error: "Search failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}