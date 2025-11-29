// components/LanguageSwitcher.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex gap-2 p-4 bg-white border-b">
      <span className="text-sm text-gray-600 mr-2">Language:</span>
      <button
        onClick={() => setLocale("en")}
        className={`px-3 py-1 text-sm rounded border ${
          locale === "en"
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLocale("de")}
        className={`px-3 py-1 text-sm rounded border ${
          locale === "de"
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        Deutsch
      </button>
    </div>
  );
}
