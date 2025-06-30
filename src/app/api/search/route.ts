import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  
  try {
    // FIXED: Use absolute path that works on Vercel
    const filePath = path.join(process.cwd(), 'src', 'data', 'blog-articles.json');
    
    // Verify file exists
    try {
      await fs.access(filePath);
    } catch (err) {
      console.error('File not found:', filePath);
      return NextResponse.json(
        { error: "Search data not found", path: filePath },
        { status: 404 }
      );
    }
    
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format: expected an array of articles');
    }

    if (!query) {
      return NextResponse.json([]);
    }

    const results = data.map((article) => {
      let score = 0;
      const searchContent = `${article.pageTitle} ${article.metaDescription || ''} ${article.description || ''}`.toLowerCase();
      
      // Case-insensitive matching
      if (article.pageTitle.toLowerCase().includes(query)) score += 5;
      if (article.metaDescription?.toLowerCase()?.includes(query)) score += 3;
      if (article.description?.toLowerCase()?.includes(query)) score += 2;
      if (searchContent.includes(query)) score += 1;

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

    return NextResponse.json(results);
    
  } catch (error: any) {
    console.error('Search error:', error.message);
    return NextResponse.json(
      { 
        error: "Search failed", 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}