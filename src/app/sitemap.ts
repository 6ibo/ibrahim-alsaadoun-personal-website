import type { MetadataRoute } from "next";
import { projects } from "@/data/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.SITE_URL || "https://6ibo.github.io";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const lastModified = new Date();
  return [
    { url: `${origin}${basePath}/`, lastModified },
    ...projects.map(({ slug }) => ({ url: `${origin}${basePath}/projects/${slug}/`, lastModified }))
  ];
}
