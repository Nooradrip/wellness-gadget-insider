// src/app/api/search/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const baseUrl = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000'
  : 'https://www.petgadgetinsider.com';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  
  console.log(`[Search API] Received query: "${query}"`);
  let debugOutput = `[Search API] Received query: "${query}"\n`;

  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'blog-articles.json');
    console.log(`[Search API] Loading articles from: ${filePath}`);
    debugOutput += `[Search API] Loading articles from: ${filePath}\n`;
    
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { articles } = JSON.parse(fileContents);
    
    console.log(`[Search API] Loaded ${articles.length} articles`);
    debugOutput += `[Search API] Loaded ${articles.length} articles\n`;

    // Test: Return first 5 article titles for debugging
    const sampleTitles = articles.slice(0, 5).map((a: any) => a.pageTitle);
    console.log('[Search API] Sample titles:', sampleTitles);
    debugOutput += `[Search API] Sample titles: ${JSON.stringify(sampleTitles)}\n`;

    const queryTerms = query.split(/\s+/).filter(term => term.length > 0);
    console.log(`[Search API] Search terms:`, queryTerms);
    debugOutput += `[Search API] Search terms: ${JSON.stringify(queryTerms)}\n`;

    const scoredResults = articles.map((article: any) => {
      // ... rest of your scoring code ...
    });

    // Filter and sort results
    const results = scoredResults
      .filter((item: any) => item.score > 0)
      .sort((a: any, b: any) => b.score - a.score);

    console.log(`[Search API] Found ${results.length} results for "${query}"`);
    debugOutput += `[Search API] Found ${results.length} results for "${query}"\n`;
    
    if (results.length > 0) {
      console.log('[Search API] Top result:', results[0]);
      debugOutput += `[Search API] Top result: ${JSON.stringify(results[0])}\n`;
    }

    // Return debug info in development
    if (process.env.NODE_ENV === 'development') {
      return new NextResponse(JSON.stringify({
        results,
        debug: debugOutput
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
    
    return new NextResponse(JSON.stringify(results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error: any) {
    const errorMessage = `[Search API] Critical error: ${error.message}`;
    console.error(errorMessage);
    
    return new NextResponse(
      JSON.stringify({ 
        error: "Search failed", 
        details: error.message,
        debug: debugOutput
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}