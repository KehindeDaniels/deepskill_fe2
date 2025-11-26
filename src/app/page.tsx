// app/page.tsx
import LocaleCategories from "@/components/category/LocaleCategories";
import Hero from "@/components/hero";
import LanguageToggle from "@/components/languageToggle";
import { ModeToggle } from "@/components/theme/ModeToggle";
// import LanguageToggle from "@/components/LanguageToggle";
// import LocaleCategories from "@/components/LocaleCategories";

export default async function Home() {
  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b">
        <ModeToggle />
        <LanguageToggle />
      </div>
      <Hero />
      <LocaleCategories />
    </div>
  );
}
