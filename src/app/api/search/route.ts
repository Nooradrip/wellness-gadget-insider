// src/app/api/search/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase().trim() || '';
  
  try {
    // 1. Verify file path (UNCHANGED)
    const filePath = path.join(process.cwd(), 'src', 'data', 'blog-articles.json');
    console.log(`Search API: Loading data from ${filePath}`);
    
    // 2. Check file exists (UNCHANGED)
    try {
      await fs.access(filePath);
      console.log('Search API: File exists');
    } catch (err) {
      console.error('Search API: File not found', err);
      return NextResponse.json(
        { error: "Data file not found", path: filePath },
        { status: 404 }
      );
    }
    
    // 3. Read file (UNCHANGED)
    const fileContents = await fs.readFile(filePath, 'utf8');
    console.log(`Search API: File read successfully (${fileContents.length} bytes)`);
    
    // 4. Parse JSON (UNCHANGED)
    let rawData;
    try {
      rawData = JSON.parse(fileContents);
      console.log('Search API: JSON parsed successfully');
    } catch (parseError) {
      console.error('Search API: JSON parse error', parseError);
      return NextResponse.json(
        { error: "Invalid JSON format", message: parseError.message },
        { status: 500 }
      );
    }
    
    // 5. Extract articles from categories (MINIMAL CHANGE)
    let allArticles: any[] = [];
    let totalArticles = 0;

    // Preserve existing structure detection
    if (rawData.mainCategories) {
      console.log(`Search API: Found ${rawData.mainCategories.length} categories`);
      
      // Flatten articles from all categories
      rawData.mainCategories.forEach((category: any) => {
        if (category.articles) {
          allArticles = [...allArticles, ...category.articles];
          totalArticles += category.articles.length;
        }
      });
    } else {
      // Fallback to original handling
      allArticles = Array.isArray(rawData) ? rawData : [rawData];
      totalArticles = allArticles.length;
    }

    console.log(`Search API: Processing ${totalArticles} articles`);
    
    if (!query) {
      console.log('Search API: Empty query - returning empty results');
      return NextResponse.json([]);
    }

    console.log(`Search API: Searching for "${query}"`);
    
    // 6. Perform search (UNCHANGED)
    const results = allArticles
      .filter(article => {
        if (!article?.slug) {
          console.warn('Search API: Article missing slug', article);
          return false;
        }
        return true;
      })
      .map(article => {
        const title = (article.pageTitle || '').toLowerCase();
        const metaDesc = (article.metaDescription || '').toLowerCase();
        const description = (article.description || '').toLowerCase();
        const allText = `${title} ${metaDesc} ${description}`;
        
        let score = 0;
        
        // Simple matching - remove scoring complexity for now
        const hasMatch = 
          title.includes(query) ||
          metaDesc.includes(query) ||
          description.includes(query) ||
          allText.includes(query);
        
        if (hasMatch) score = 1; // Simple binary match
        
        return {
          url: `/blog/${article.slug}`,
          title: article.pageTitle,
          description: article.metaDescription || article.description,
          breadcrumbs: article.mainCategoryName || '',
          score
        };
      })
      .filter(item => item.score > 0);

    console.log(`Search API: Found ${results.length} matches`);
    
    return NextResponse.json(results);
    
  } catch (error) {
    console.error('Search API: Unexpected error', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}