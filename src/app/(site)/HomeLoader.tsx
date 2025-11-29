"use client";

import { useLanguage } from "@/context/LanguageContext";
import HomeContent from "./HomeContent";
// import HomeContent from "./HomeContent";

export default function HomeLoader() {
  const { locale } = useLanguage();

  return <HomeContent locale={locale} />;
}
