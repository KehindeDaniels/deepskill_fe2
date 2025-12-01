import { client } from "@/lib/strapi";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getLocaleFromHeaders } from "@/lib/locale";
import Image from "next/image";
import RenderBlocks from "@/components/modules/RenderBlocks";

export default async function ModuleSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocaleFromHeaders();

  const modulesApi = client.collection("modules");

  const response = await modulesApi.find({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    locale: locale,
    populate: {
      heroImage: { populate: "*" },
      category: {
        populate: "*",
      },
    },
  });

  const moduleData = response.data?.[0];

  if (!moduleData) {
    console.log("Module not found for slug:", slug);
    return notFound();
  }

  // Get heroImage - single image object
  const heroImageData = moduleData.heroImage;

  // Get the image URL
  let heroImageUrl = null;

  if (heroImageData) {
    heroImageUrl =
      heroImageData?.formats?.large?.url ||
      heroImageData?.formats?.medium?.url ||
      heroImageData?.formats?.small?.url ||
      heroImageData?.url;
  }

  // Construct full URL
  const fullHeroImageUrl = heroImageUrl
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${heroImageUrl}`
    : null;

  // Alt text for hero image
  const heroImageAlt =
    heroImageData?.alternativeText ||
    heroImageData?.caption ||
    moduleData.title;

  // add consoles to check the image data
  console.log("image data:", heroImageData);
  console.log("hero image url:", heroImageUrl);
  console.log("full hero image url:", fullHeroImageUrl);

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
        {moduleData.category && (
          <Link
            href={`/categories/${moduleData.category.slug}`}
            className="ml-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {moduleData.category.title}
          </Link>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative h-60 w-full overflow-hidden rounded-b-3xl mt-4">
        {fullHeroImageUrl ? (
          <Image
            src={fullHeroImageUrl}
            alt={`${heroImageAlt} - Hero Image`}
            fill
            className="object-cover brightness-90"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-r from-indigo-600 to-blue-500" />
        )}

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            {moduleData.title}
          </h1>
          <p className="max-w-3xl text-gray-200 mt-2">
            {moduleData.shortDescription || "Explore this learning module."}
          </p>
        </div>
      </section>

      {/* Module Details */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          {/* Module Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Level</p>
              <p className="font-semibold capitalize">{moduleData.level}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Duration
              </p>
              <p className="font-semibold">
                {moduleData.duration}{" "}
                {moduleData.duration === 1 ? "hour" : "hours"}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
              <p className="font-semibold">
                {moduleData.avgRating
                  ? `${moduleData.avgRating}/5`
                  : "Not rated yet"}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Module Overview</h2>
            <RenderBlocks blocks={moduleData.description || []} />
          </div>

          {/* Category Info */}
          {moduleData.category && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Category</h3>
              <Link
                href={`/categories/${moduleData.category.slug}`}
                className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="mr-2">{moduleData.category.title}</span>
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
