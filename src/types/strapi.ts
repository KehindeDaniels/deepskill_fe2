// types/strapi.ts
export type StrapiImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  //   provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type StrapiImage = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  //   provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type StrapiModule = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  duration?: number;
  difficulty?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  thumbnail?: StrapiImage[];
};
