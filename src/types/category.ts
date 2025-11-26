import { StrapiImage } from "./strapi";

export type ModuleLite = {
  id: number;
  title: string;
};

export type Category = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  caption?: string | null;
  thumbnail: StrapiImage[]; // ARRAY!
  modules: ModuleLite[];
};
