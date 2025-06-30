import { NextResponse } from 'next/server';
import blogArticles from '@/data/blog-articles.json';

export async function GET() {
  try {
    return NextResponse.json({
      status: 'success',
      data: {
        isArray: Array.isArray(blogArticles),
        count: Array.isArray(blogArticles) ? blogArticles.length : 1,
        sampleItem: Array.isArray(blogArticles) ? blogArticles[0] : blogArticles,
        requiredFields: ['slug', 'pageTitle', 'description'],
        validation: {
          hasSlug: Array.isArray(blogArticles) 
            ? blogArticles.every(item => item?.slug)
            : !!blogArticles?.slug,
          hasTitle: Array.isArray(blogArticles)
            ? blogArticles.every(item => item?.pageTitle)
            : !!blogArticles?.pageTitle,
        }
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}