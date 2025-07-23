import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import Image from "next/image";
import { Metadata } from "next";

interface BlogCategory {
  slug: string;
  name: string;
  titleTag: string;
  metaDescription: string;
  description: string;
  categoryPageContent?: string;
}

interface BlogArticle {
  slug: string;
  pageTitle: string;
  description: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  mainCategorySlug: string;
}

interface BlogData {
  mainCategories: BlogCategory[];
  articles: BlogArticle[];
}

interface PageProps {
  params: { 
    category: string;
  };
}

export async function generateStaticParams() {
  const { mainCategories } = blogData as BlogData;
  return mainCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = params;
  const { mainCategories } = blogData as BlogData;
  
  const categorySlug = category?.trim().toLowerCase() || '';
  
  const mainCategory = mainCategories.find(
    cat => cat.slug?.trim().toLowerCase() === categorySlug
  );

  if (!mainCategory) {
    return {
      title: 'Category Not Found',
      description: 'The requested category does not exist.'
    };
  }

  return {
    metadataBase: new URL('https://wellnessgadgetinsider.org'),
    title: mainCategory.titleTag,
    description: mainCategory.metaDescription,
    openGraph: {
      title: mainCategory.titleTag,
      description: mainCategory.metaDescription,
    },
    twitter: {
      title: mainCategory.titleTag,
      description: mainCategory.metaDescription,
    }
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const { mainCategories, articles } = blogData as BlogData;

  const categorySlug = category?.trim().toLowerCase() || '';
  
  const mainCategory = mainCategories.find(
    cat => cat.slug?.trim().toLowerCase() === categorySlug
  );

  if (!mainCategory) {
    notFound();
  }

  const filteredArticles = articles.filter(article => 
    article.mainCategorySlug?.trim().toLowerCase() === categorySlug
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        links={[
          { href: '/', text: 'Home' },
          { href: '/blog', text: 'Wellness Gadget Reviews' }
        ]}
        currentPage={mainCategory.name}
      />

      <h1 className="text-3xl font-bold mb-4">{mainCategory.name}</h1>
      
      {/* Category description */}
      {mainCategory.description && (
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
          {mainCategory.description}
        </p>
      )}

      {filteredArticles.length === 0 ? (
        <p className="text-gray-600">No articles available in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${encodeURIComponent(article.slug)}`}
              className="block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
              prefetch={false}
            >
              <div className="h-36 overflow-hidden bg-gray-100 relative">
                <Image
                  src={article.featuredImageUrl}
                  alt={article.featuredImageAlt || article.pageTitle}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{article.pageTitle}</h2>
                {article.description && (
                  <p className="text-gray-600 line-clamp-2">{article.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Extended category page content */}
      {mainCategory.categoryPageContent && (
        <div className="mt-16 max-w-4xl mx-auto">
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: mainCategory.categoryPageContent }} 
          />
        </div>
      )}

      {/* Medical disclaimer */}
      <div className="mt-8 max-w-4xl mx-auto italic text-gray-600 dark:text-gray-400">
        Everything on Wellness Gadget Insider is for informational purposes. We don't diagnose, provide medical advice or treatment. Please consult your healthcare practitioner if you intend to use any of the devices discussed for health and wellness.
      </div>
    </div>
  );
}