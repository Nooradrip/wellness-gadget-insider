// src/app/sitemap.xml/route.js
import { promises as fs } from 'fs';
import path from 'path';

const BASE_URL = 'https://wellness-gadget-insider.vercel.app';

// Force dynamic route behavior - bypass all caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getLastmod(filePath) {
  try {
    const stats = await fs.stat(path.join(process.cwd(), filePath));
    return stats.mtime.toISOString().split('T')[0];
  } catch (err) {
    console.warn(`Could not get lastmod for ${filePath}:`, err.message);
    return new Date().toISOString().split('T')[0];
  }
}

export async function GET() {
  try {
    console.log('Generating fresh sitemap...');
    
    // CORRECTED PATH FOR JSON FILE
    const blogData = JSON.parse(
      await fs.readFile(
        path.join(process.cwd(), 'src', 'data', 'blog-articles.json'), // Updated path
        'utf-8'
      )
    );

    // Static pages
    const staticPages = await Promise.all([
      { url: '/', file: 'app/page.tsx', priority: 1.0, changefreq: 'daily' },
      { url: '/blog', file: 'app/blog/page.tsx', priority: 0.85, changefreq: 'daily' },
      { url: '/about', file: 'app/about/page.tsx', priority: 0.9, changefreq: 'monthly' },
      { url: '/faq', file: 'app/faq/page.tsx', priority: 0.85, changefreq: 'monthly' }
    ].map(async (page) => ({
      url: page.url,
      lastmod: await getLastmod(page.file),
      priority: page.priority,
      changefreq: page.changefreq
    })));

    // Category pages
    const categoryPages = blogData.mainCategories.map(category => ({
      url: `/blog/category/${category.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: 0.8,
      changefreq: 'weekly'
    }));

    // Article pages
    const articlePages = blogData.articles.map(article => ({
      url: `/blog/${article.slug}`,
      lastmod: article.dateModified || article.datePublished || new Date().toISOString().split('T')[0],
      priority: 0.7,
      changefreq: 'weekly'
    }));

    // Combine all
    const allPages = [...staticPages, ...categoryPages, ...articlePages];

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `<url>
  <loc>${BASE_URL}${page.url}</loc>
  <lastmod>${page.lastmod}</lastmod>
  <changefreq>${page.changefreq}</changefreq>
  <priority>${page.priority}</priority>
</url>`).join('\n')}
</urlset>`;

    console.log('Sitemap generated successfully');
    
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=60'
      }
    });

  } catch (error) {
    console.error('Sitemap generation failed:', error);
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<error>
  <message>Sitemap generation failed</message>
  <detail>${error.message}</detail>
</error>`, {
      status: 500,
      headers: { 
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  }
}