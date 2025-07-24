// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import blogData from '@/data/blog-articles.json';

const BASE_URL = 'https://wellness-gadget-insider.vercel.app';

// Critical fix: Force dynamic behavior to prevent caching issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),  // Must be ISO string
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date().toISOString(),  // Must be ISO string
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date().toISOString(),  // Must be ISO string
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date().toISOString(),  // Must be ISO string
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }
  ];

  // Category pages
  const categoryPages = blogData.mainCategories.map(category => ({
    url: `${BASE_URL}/blog/category/${category.slug}`,
    lastModified: new Date().toISOString(),  // Must be ISO string
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Article pages
  const articlePages = blogData.articles.map(article => {
    // Handle date conversion properly
    let lastModifiedDate;
    try {
      lastModifiedDate = new Date(article.dateModified || article.datePublished || Date.now());
    } catch {
      lastModifiedDate = new Date();
    }
    
    return {
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: lastModifiedDate.toISOString(),  // Must be ISO string
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...categoryPages, ...articlePages];
}