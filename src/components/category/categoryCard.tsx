"use client";

import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import { useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";

type Props = {
  title: string;
  slug: string;
  caption?: string;
  thumbnail: any;
  modules?: any[];
};

export default function CategoryCard({
  title,
  slug,
  caption,
  thumbnail,
  modules = [],
}: Props) {
  // Initialize AOS animation
  useEffect(() => {
    AOS.init({ duration: 600, easing: "ease-out-cubic", once: true });
  }, []);

  // Extract the first image
  const img = Array.isArray(thumbnail) ? thumbnail[0] : thumbnail;
  const formats = img?.formats || {};

  const imageUrl =
    formats?.medium?.url ||
    formats?.small?.url ||
    img?.url ||
    "/placeholder.jpg";

  const fullImageUrl = imageUrl.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`
    : imageUrl;

  const altText = img?.alternativeText || img?.caption || title;

  return (
    <Link href={`/categories/${slug}`} data-aos="fade-up">
      <Card className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl dark:bg-gray-900 dark:border-gray-700">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={fullImageUrl}
            alt={altText}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        </div>

        {/* Content */}
        <CardContent className="p-5">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {caption || "Discover high-impact learning modules."}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {modules.length} {modules.length === 1 ? "module" : "modules"}
            </span>

            <ArrowRight className="h-4 w-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
