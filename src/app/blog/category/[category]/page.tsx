import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import { Metadata } from "next";

interface MainCategory {
  slug: string;
  name: string;
  description: string;
  titleTag: string;
  metaDescription: string;
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
  mainCategorySlug: string;
  mainCategoryName: string;
  subCategorySlug: string;
}

interface BlogData {
  mainCategories: MainCategory[];
  subCategories: SubCategory[];
  articles: Article[];
}

interface PageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { category } = params;
  const { mainCategories } = blogData as BlogData;
  
  // Find the main category by slug
  const mainCategory = mainCategories.find(
    cat => cat.slug?.trim().toLowerCase() === category.trim().toLowerCase()
  );

  if (!mainCategory) {
    return {
      title: 'Category Not Found',
      description: 'The requested category does not exist.'
    };
  }

  return {
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

export default async function CategoryPage({ params }: PageProps) {
  const { category } = params;
  const { mainCategories, subCategories, articles } = blogData as BlogData;

  // Find the main category
  const mainCategory = mainCategories.find(
    cat => cat.slug?.trim().toLowerCase() === category.trim().toLowerCase()
  );

  if (!mainCategory) {
    notFound();
  }

  // Find subcategories for this main category
  const filteredSubCategories = subCategories.filter((sub) => {
    const mainCatSlug = sub.mainCategorySlug?.trim().toLowerCase() ?? "";
    return mainCatSlug === category.trim().toLowerCase();
  });

  if (filteredSubCategories.length === 0) {
    notFound();
  }

  const subCategoriesWithCounts = filteredSubCategories.map((sub) => {
    const subSlug = sub.slug?.trim().toLowerCase() ?? "";
    const reqCategory = category.trim().toLowerCase();

    const articleCount = articles.filter((article) => {
      const artMainCat = article.mainCategorySlug?.trim().toLowerCase() ?? "";
      const artSubCat = article.subCategorySlug?.trim().toLowerCase() ?? "";
      return artMainCat === reqCategory && artSubCat === subSlug;
    }).length;

    return { ...sub, articleCount };
  });

  // Fixed syntax error here - removed extra parenthesis
  const totalArticles = subCategoriesWithCounts.reduce(
    (sum, sub) => sum + sub.articleCount,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        links={[
          { href: '/blog', text: 'Blog' }
        ]}
        currentPage={mainCategory.name}
      />

      <h1 className="text-3xl font-bold mb-6">{mainCategory.name}</h1>

      {totalArticles === 0 ? (
        <p className="text-gray-600">
          No articles available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subCategoriesWithCounts.map((sub) =>
            sub.articleCount > 0 ? (
              <Link
                key={sub.slug}
                href={`/blog/category/${encodeURIComponent(
                  category
                )}/${encodeURIComponent(sub.slug)}`}
                className="block border rounded p-4 hover:shadow transition-shadow"
                prefetch={false}
              >
                <h2 className="text-xl font-bold">{sub.name}</h2>
                <p className="mt-2 text-gray-600">{sub.description}</p>
                <p className="mt-1 text-sm text-sky-600">
                  {sub.articleCount} article{sub.articleCount === 1 ? "" : "s"}
                </p>
              </Link>
            ) : (
              <div key={sub.slug} className="block border rounded p-4">
                <h2 className="text-xl font-bold">{sub.name}</h2>
                <p className="mt-2 text-gray-600">{sub.description}</p>
                <p className="mt-1 text-sm italic text-gray-500">
                  No articles available
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}