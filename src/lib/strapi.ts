import { strapi } from "@strapi/client";

export const client = strapi({
  baseURL: process.env.STRAPI_API_BASE_URL || "http://localhost:1337/api",
  auth: process.env.STRAPI_API_KEY,
});
