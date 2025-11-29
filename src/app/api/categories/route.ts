// app/api/categories/route.ts
import { client } from "@/lib/strapi";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get("locale") || "en";

  try {
    const categoriesApi = client.collection("categories");
    const result = await categoriesApi.find({
      locale,
      populate: "*",
    });

    return Response.json(result.data || []);
  } catch (error) {
    console.error("API Error:", error);
    return Response.json([], { status: 200 });
  }
}
