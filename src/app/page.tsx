import { client } from "@/lib/strapi";
import Hero from "@/components/hero";
import LanguageToggle from "@/components/languageToggle";
import { ModeToggle } from "@/components/theme/ModeToggle";
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

  const categories: Category[] = response.data || [];

  return (
    <div data-testid="home-page">
      <div
        className="flex items-center justify-between p-4 border-b"
        data-testid="header-controls"
      >
        <ModeToggle />
        <LanguageToggle />
      </div>
      <Hero />

      <section
        className="mx-auto max-w-6xl px-6 py-12"
        data-testid="categories-section"
      >
        <h2
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
          data-testid="categories-heading"
        >
          Categories ({categories.length})
        </h2>

        {categories.length > 0 ? (
          <CategoryGrid categories={categories} />
        ) : (
          <div className="text-center py-8" data-testid="no-categories-message">
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
