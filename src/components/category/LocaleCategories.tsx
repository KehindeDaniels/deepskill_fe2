// components/LocaleCategories.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
// import CategoryGrid from "./category/categoryGrid";
import { useState, useEffect } from "react";
import { Category } from "@/types/category";
import CategoryGrid from "./categoryGrid";

export default function LocaleCategories() {
  const { locale } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLocalizedCategories() {
      setLoading(true);
      try {
        const response = await fetch(`/api/categories?locale=${locale}`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch localized categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLocalizedCategories();
  }, [locale]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">
          Loading {locale === "en" ? "English" : "German"} categories...
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-600 mb-4">
          No categories available in {locale === "en" ? "English" : "German"}
        </h2>
        <p className="text-gray-500">
          {locale === "en"
            ? "Content is being prepared. Please check back soon!"
            : "Inhalte werden vorbereitet. Bitte schauen Sie bald wieder vorbei!"}
        </p>
      </div>
    );
  }

  return <CategoryGrid categories={categories} />;
}
