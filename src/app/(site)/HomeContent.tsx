import CategoryGrid from "@/components/category/categoryGrid";
import { client } from "@/lib/strapi";
import Hero from "@/components/hero";
import { ModeToggle } from "@/components/theme/ModeToggle";

export default async function HomeContent({ locale }: { locale: string }) {
  const categoriesApi = client.collection("categories");
  const categories = await categoriesApi.find({ locale });

  return (
    <div>
      <ModeToggle />
      <Hero />
      <CategoryGrid categories={categories.data} />
    </div>
  );
}
