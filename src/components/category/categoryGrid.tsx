// components/category/CategoryGrid.tsx
import { Category } from "@/types/category";
import CategoryCard from "./categoryCard";
// import CategoryCard from "./CategoryCard";

type Props = {
  categories: Category[];
};

export default function CategoryGrid({ categories }: Props) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id || cat.documentId}
          title={cat.title}
          slug={cat.slug}
          caption={cat.caption}
          thumbnail={cat.thumbnail}
          modules={cat.modules}
        />
      ))}
    </div>
  );
}
