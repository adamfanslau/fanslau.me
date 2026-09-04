import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

// Add new routes here as the site grows, e.g. "/blog".
const routes = ["/", "/cv"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).href,
    lastModified: new Date(),
  }));
}
