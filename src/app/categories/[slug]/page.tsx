import { client } from "@/lib/strapi";
import ModuleCard from "@/components/modules/ModuleCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function CategorySlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const categoriesApi = client.collection("categories");

  const response = await categoriesApi.find({
    filters: {
      slug: {
        $eq: slug, // ensure exact match
      },
    },
    populate: {
      thumbnail: { populate: "*" },
      modules: { populate: ["thumbnail"] },
    },
  });

  const category = response.data?.[0];

  if (!category) return notFound();

  const thumb =
    category.thumbnail?.[0]?.formats?.large?.url ||
    category.thumbnail?.[0]?.url ||
    null;

  const heroImage = thumb
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${thumb}`
    : null;

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Banner */}
      <section className="relative h-60 w-full overflow-hidden rounded-b-3xl mt-4">
        {heroImage ? (
          <img
            src={heroImage}
            alt={category.title}
            className="h-full w-full object-cover brightness-90"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-indigo-600 to-blue-500" />
        )}

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            {category.title}
          </h1>
          <p className="max-w-3xl text-gray-200 mt-2">
            {category.caption || "Explore modules under this category."}
          </p>
        </div>
      </section>

      {/* Modules */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold dark:text-white mb-6">
          Modules ({category.modules?.length || 0})
        </h2>

        {category.modules?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.modules.map((mod: any) => (
              <ModuleCard key={mod.documentId} module={mod} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No modules available for this category.
          </p>
        )}
      </section>
    </div>
  );
}
