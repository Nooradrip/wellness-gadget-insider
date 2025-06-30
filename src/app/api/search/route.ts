// src/app/api/search/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase().trim() || '';
  
  try {
    // 1. Verify file path
    const filePath = path.join(process.cwd(), 'src', 'data', 'blog-articles.json');
    console.log(`Search API: Loading data from ${filePath}`);
    
    // 2. Check file exists
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
    
    // 3. Read file
    const fileContents = await fs.readFile(filePath, 'utf8');
    console.log(`Search API: File read successfully (${fileContents.length} bytes)`);
    
    // 4. Parse JSON
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
    
    // 5. Extract articles from categories
    let allArticles: any[] = [];
    let totalArticles = 0;

    // Handle category-based structure
    if (rawData.mainCategories && Array.isArray(rawData.mainCategories)) {
      console.log(`Search API: Found ${rawData.mainCategories.length} categories`);
      
      // Properly extract articles from each category
      rawData.mainCategories.forEach((category: any) => {
        const articlesInCategory = 
          category.articles || 
          category.data?.articles;
        
        if (articlesInCategory && Array.isArray(articlesInCategory)) {
          allArticles = [...allArticles, ...articlesInCategory];
          totalArticles += articlesInCategory.length;
          console.log(`Search API: Added ${articlesInCategory.length} articles from category "${category.name}"`);
        } else {
          console.warn(`Search API: No articles found in category "${category.name}"`);
        }
      });
    }
    
    // Fallback: Try to find articles at top level
    if (totalArticles === 0) {
      if (rawData.articles && Array.isArray(rawData.articles)) {
        allArticles = rawData.articles;
        totalArticles = rawData.articles.length;
        console.log(`Search API: Using top-level articles array (${totalArticles} articles)`);
      } else {
        console.warn('Search API: No articles found in any category or top-level');
      }
    }

    console.log(`Search API: Processing ${totalArticles} articles`);
    
    if (!query) {
      console.log('Search API: Empty query - returning empty results');
      return NextResponse.json([]);
    }

    console.log(`Search API: Searching for "${query}"`);
    
    // 6. Enhanced scoring system
    const results = allArticles
      .filter(article => {
        if (!article?.slug) {
          console.warn('Search API: Article missing slug', article);
          return false;
        }
        return true;
      })
      .map(article => {
        const title = (article.pageTitle || article.title || '').toLowerCase();
        const metaDesc = (article.metaDescription || '').toLowerCase();
        const description = (article.description || '').toLowerCase();
        
        // Initialize scoring
        let score = 0;
        
        // 1. Exact matches get highest priority
        if (title === query) score += 10;
        if (metaDesc === query) score += 8;
        if (description === query) score += 6;
        
        // 2. Field-specific partial matches
        if (title.includes(query)) {
          score += 6;
          // Boost if match is near beginning
          if (title.indexOf(query) < 20) score += 2;
        }
        
        if (metaDesc.includes(query)) {
          score += 4;
          // Boost for exact phrase match
          if (metaDesc.includes(` ${query} `)) score += 2;
        }
        
        if (description.includes(query)) {
          score += 2;
          // Boost for multiple occurrences
          const count = (description.match(new RegExp(query, 'g')) || []).length;
          if (count > 1) score += count;
        }
        
        // 3. Category boosts
        if (article.mainCategoryName?.toLowerCase().includes(query)) {
          score += 3;
        }
        
        // 4. Freshness boost (if articles have dates)
        if (article.publishedDate) {
          const pubDate = new Date(article.publishedDate);
          const ageInMonths = (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
          if (ageInMonths < 6) score += 3; // Recent articles
        }
        
        return {
          url: `/blog/${article.slug}`,
          title: article.pageTitle || article.title,
          description: article.metaDescription || article.description,
          breadcrumbs: article.mainCategoryName || article.mainCategory || '',
          score
        };
      })
      .filter(item => item.score > 0)
      // Sort by score descending
      .sort((a, b) => b.score - a.score);

    console.log(`Search API: Found ${results.length} matches`);
    
    // Return results with scores
    return NextResponse.json(results);
    
  } catch (error) {
    console.error('Search API: Unexpected error', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}