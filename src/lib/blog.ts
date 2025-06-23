// src/lib/blog.ts
export interface BlogArticle {
  title: string;
  slug: string;
  description?: string;
}

export async function getAllBlogPosts(): Promise<BlogArticle[]> {
  try {
    // Directly require the JSON file
    const blogData = require('@/data/blog-articles.json');
    return blogData.articles || [];
  } catch (error) {
    console.error('Failed to load blog articles:', error);
    return [];
  }
}