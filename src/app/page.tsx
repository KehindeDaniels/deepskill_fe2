// app/page.tsx
import { client } from "@/lib/strapi";
import Hero from "@/components/hero";
import LanguageToggle from "@/components/languageToggle";
import { ModeToggle } from "@/components/theme/ModeToggle";
// import CategoryGrid from "@/components/category/CategoryGrid";
import { getLocaleFromHeaders } from "@/lib/locale";
import { Category } from "@/types/category";
import CategoryGrid from "@/components/category/categoryGrid";

export default async function Home() {
  const locale = await getLocaleFromHeaders();

  const categoriesApi = client.collection("categories");
  const response = await categoriesApi.find({
    locale,
    populate: {
      thumbnail: { populate: "*" },
      modules: { populate: ["thumbnail"] },
    },
  });

  // Type assertion to ensure we have the right type
  // dont use any
  // const categories: Category[] = (response.data || []).map((item: any) => ({
  //   id: item.id,
  //   documentId: item.documentId,
  //   title: item.title,
  //   slug: item.slug,
  //   caption: item.caption,
  //   thumbnail: item.thumbnail,
  //   modules: item.modules,

  //   locale: item.locale,
  // }));
  const categories: Category[] = response.data || [];
  // Temporary debug in your homepage
  console.log(
    "Strapi actual response:",
    JSON.stringify(response.data?.[0], null, 2)
  );
  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b">
        <ModeToggle />
        <LanguageToggle />
      </div>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Categories ({categories.length})
        </h2>

        {categories.length > 0 ? (
          <CategoryGrid categories={categories} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {locale === "en"
                ? "No categories available yet."
                : "Noch keine Kategorien verfügbar."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
