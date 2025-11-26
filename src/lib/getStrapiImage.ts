import { StrapiImage } from "@/types/strapi";

export function getBestImage(imgArray?: StrapiImage[]) {
  if (!imgArray || imgArray.length === 0) return null;

  const img = imgArray[0];

  return (
    img.formats?.medium?.url ||
    img.formats?.large?.url ||
    img.formats?.small?.url ||
    img.formats?.thumbnail?.url ||
    img.url
  );
}
