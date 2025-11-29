"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Button } from "../ui/button";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  function toggle() {
    setLocale(locale === "en" ? "de" : "en");
  }

  return (
    <Button
      onClick={toggle}
      className="px-3 py-1 rounded-full border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {locale === "en" ? "DE" : "EN"}
    </Button>
  );
}
