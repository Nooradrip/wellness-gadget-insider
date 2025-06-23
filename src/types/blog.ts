// src/types/blog.ts
export interface BlogArticle {
  title: string;
  slug: string;
  description?: string;
  content?: string;
  tags?: string[];
  // Add any other fields you have in your JSON
}