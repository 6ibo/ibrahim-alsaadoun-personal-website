import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const origin = process.env.SITE_URL || "https://6ibo.github.io";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return { rules: { userAgent: "*", allow: `${basePath}/` }, sitemap: `${origin}${basePath}/sitemap.xml` };
}
