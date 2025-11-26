"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Star } from "lucide-react";

export default function ModuleCard({ module }: { module: any }) {
  const img = module.thumbnail?.[0];
  const imageUrl = img?.formats?.medium?.url || img?.url || "/placeholder.jpg";

  const fullImage = imageUrl.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`
    : imageUrl;

  return (
    <Link href={`/modules/${module.slug}`}>
      <Card className="group rounded-2xl overflow-hidden hover:shadow-xl transition-all">
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={fullImage}
            alt={module.title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <CardContent className="p-5">
          <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition">
            {module.title}
          </h3>

          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {module.shortDescription}
          </p>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {module.duration} min
            </span>

            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              {module.avgRating || "4.8"}
            </span>
          </div>

          <ArrowRight className="h-4 w-4 mt-3 text-indigo-600 group-hover:translate-x-1 transition-transform" />
        </CardContent>
      </Card>
    </Link>
  );
}
