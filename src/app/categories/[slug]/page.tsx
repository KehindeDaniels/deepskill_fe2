import { client } from "@/lib/strapi";
import ModuleCard from "@/components/modules/ModuleCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getLocaleFromHeaders } from "@/lib/locale";
import Image from "next/image";

export default async function CategorySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocaleFromHeaders();

  const categoriesApi = client.collection("categories");

  const response = await categoriesApi.find({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    locale: locale,
    populate: {
      thumbnail: { populate: "*" },
      modules: {
        populate: ["thumbnail"],
        filters: {
          locale: {
            $eq: locale,
          },
        },
      },
    },
  });

  const category = response.data?.[0];

  console.log("Category Page Debug:", {
    slug,
    locale,
    categoryFound: !!category,
    categoryTitle: category?.title,
    categorySlug: category?.slug,
    modulesCount: category?.modules?.length,
  });

  if (!category) {
    console.log("Category not found for slug:", slug);
    return notFound();
  }

  const thumb =
    category.thumbnail?.[0]?.formats?.large?.url ||
    category.thumbnail?.[0]?.url ||
    null;

  const heroImage = thumb
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${thumb}`
    : null;

  return (
    <div
      className="min-h-screen"
      data-testid="category-page"
      data-category-slug={slug}
    >
      {/* Back Button */}
      <div className="px-6 pt-6" data-testid="back-button-container">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          data-testid="back-to-home-link"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Banner */}
      <section
        className="relative h-60 w-full overflow-hidden rounded-b-3xl mt-4"
        data-testid="category-banner"
      >
        {heroImage ? (
          <Image
            src={heroImage}
            alt={category.title}
            fill
            className="object-cover brightness-90"
            priority
            data-testid="category-hero-image"
          />
        ) : (
          <div
            className="h-full w-full bg-linear-to-r from-indigo-600 to-blue-500"
            data-testid="category-hero-placeholder"
          />
        )}

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <h1
            className="text-4xl font-bold text-white drop-shadow-lg"
            data-testid="category-title"
          >
            {category.title}
          </h1>
          <p
            className="max-w-3xl text-gray-200 mt-2"
            data-testid="category-caption"
          >
            {category.caption || "Explore modules under this category."}
          </p>
        </div>
      </section>

      {/* Modules */}
      <section
        className="mx-auto max-w-6xl px-6 py-12"
        data-testid="modules-section"
      >
        <h2
          className="text-2xl font-semibold dark:text-white mb-6"
          data-testid="modules-heading"
        >
          Modules ({category.modules?.length || 0})
        </h2>

        {category.modules?.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="modules-grid"
          >
            {category.modules.map((mod) => (
              <ModuleCard
                key={mod.documentId || mod.id}
                module={mod}
                data-testid={`module-card-${mod.slug}`}
              />
            ))}
          </div>
        ) : (
          <p
            className="text-gray-600 dark:text-gray-400"
            data-testid="no-modules-message"
          >
            No modules available for this category.
          </p>
        )}
      </section>
    </div>
  );
}
