import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import { Metadata } from "next";

interface MainCategory {
  slug: string;
  name: string;
}

interface SubCategory {
  slug: string;
  name: string;
  description: string;
  mainCategorySlug: string;
  titleTag: string;
  metaDescription: string;
}

interface Article {
  slug: string;
  title: string;
  description: string;
  mainCategorySlug: string;
  mainCategoryName: string;
  subCategorySlug: string;
  pageTitle: string;
  featuredImageUrl: string;
}

interface BlogData {
  mainCategories: MainCategory[];
  subCategories: SubCategory[];
  articles: Article[];
}

interface PageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { category, subcategory } = params;
  const { subCategories } = blogData as BlogData;
  
  const foundSubCategory = subCategories.find(sub => 
    sub.mainCategorySlug?.trim().toLowerCase() === category.trim().toLowerCase() &&
    sub.slug?.trim().toLowerCase() === subcategory.trim().toLowerCase()
  );

  if (!foundSubCategory) {
    return {
      title: 'Subcategory Not Found',
      description: 'The requested subcategory does not exist.'
    };
  }

  return {
    title: foundSubCategory.titleTag,
    description: foundSubCategory.metaDescription,
    openGraph: {
      title: foundSubCategory.titleTag,
      description: foundSubCategory.metaDescription,
    },
    twitter: {
      title: foundSubCategory.titleTag,
      description: foundSubCategory.metaDescription,
    }
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = params;
  const { mainCategories, subCategories, articles } = blogData as BlogData;
  
  const currentSubCategory = subCategories.find(sub => 
    sub.mainCategorySlug?.trim().toLowerCase() === category.trim().toLowerCase() &&
    sub.slug?.trim().toLowerCase() === subcategory.trim().toLowerCase()
  );
  
  if (!currentSubCategory) {
    notFound();
  }
  
  const mainCategory = mainCategories.find(
    cat => cat.slug?.trim().toLowerCase() === category.trim().toLowerCase()
  );
  
  if (!mainCategory) {
    notFound();
  }
  
  // Fixed: Corrected variable name (articles instead of article)
  const filteredArticles = articles.filter(article => 
    article.mainCategorySlug?.trim().toLowerCase() === category.trim().toLowerCase() &&
    article.subCategorySlug?.trim().toLowerCase() === subcategory.trim().toLowerCase()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        links={[
          { href: '/blog', text: 'Blog' },
          { 
            href: `/blog/category/${encodeURIComponent(category)}`, 
            text: mainCategory.name 
          }
        ]}
        currentPage={currentSubCategory.name}
      />

      <h1 className="text-3xl font-bold mb-6">{currentSubCategory.name}</h1>
      
      {currentSubCategory.description && (
        <p className="text-lg mb-6">{currentSubCategory.description}</p>
      )}

      {filteredArticles.length === 0 ? (
        <p className="text-gray-600">No articles available in this subcategory.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${encodeURIComponent(article.slug)}`}
              className="block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
              prefetch={false}
            >
              {/* Featured Image with gray background */}
              <div className="h-36 overflow-hidden bg-gray-100">
                <img 
                  src={article.featuredImageUrl} 
                  alt={article.title}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Article Content */}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{article.pageTitle || article.title}</h2>
                {article.description && (
                  <p className="text-gray-600 line-clamp-2">{article.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}