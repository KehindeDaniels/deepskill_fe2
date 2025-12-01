// types/category.ts
import { StrapiImage, StrapiModule } from "./strapi";

export type Category = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  caption?: string;
  thumbnail: StrapiImage[] | null;
  modules?: StrapiModule[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
};
