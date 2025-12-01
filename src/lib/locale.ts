// lib/locale.ts
import { headers } from "next/headers";

export async function getLocaleFromHeaders(): Promise<string> {
  try {
    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language");
    return acceptLanguage?.split(",")[0]?.split("-")[0] || "en";
  } catch (error) {
    return "en";
    console.error("Error getting locale from headers:", error);
  }
}
