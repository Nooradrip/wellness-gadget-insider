// app/api/search/route.ts
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
      // Convert single object to array
      articles = [data];
    } else {
      throw new Error('Invalid data format: Expected object or array of articles');
    }

    if (!query) {
      return NextResponse.json([]);
    }

    const results = articles
      .filter(article => article && article.slug) // Ensure valid articles
      .map((article) => {
        let score = 0;
        const searchContent = `
          ${article.pageTitle || ''} 
          ${article.metaDescription || ''} 
          ${article.description || ''}
        `.toLowerCase();

        // Scoring logic
        if (article.pageTitle?.toLowerCase().includes(query)) score += 5;
        if (article.metaDescription?.toLowerCase()?.includes(query)) score += 3;
        if (article.description?.toLowerCase()?.includes(query)) score += 2;
        if (searchContent.includes(query)) score += 1;

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
      .slice(0, 10);

    return NextResponse.json(results);
    
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json(
      { 
        error: "Search failed",
        details: error.message,
        suggestion: "Check the structure of blog-articles.json"
      },
      { status: 500 }
    );
  }
}