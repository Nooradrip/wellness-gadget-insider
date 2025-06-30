import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase().trim() || '';
  
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'blog-articles.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const rawData = JSON.parse(fileContents);
    
    // Handle both array and single object formats
    const articles = Array.isArray(rawData) ? rawData : [rawData];
    
    if (!query) {
      return NextResponse.json([]);
    }

    const results = articles
      .filter(article => article?.slug) // Must have a slug
      .map(article => {
        let score = 0;
        const title = (article.pageTitle || '').toLowerCase();
        const desc = (article.metaDescription || article.description || '').toLowerCase();
        
        // Basic scoring
        if (title.includes(query)) score += 5;
        if (desc.includes(query)) score += 3;
        if (`${title} ${desc}`.includes(query)) score += 1;
        
        return {
          url: `/blog/${article.slug}`,
          title: article.pageTitle,
          description: article.metaDescription || article.description,
          breadcrumbs: article.mainCategoryName || '',
          score
        };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return NextResponse.json(results);
    
  } catch (error) {
    // Return empty array on any error
    return NextResponse.json([]);
  }
}