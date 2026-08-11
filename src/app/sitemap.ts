import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { cities } from "@/lib/cities";
import { absoluteUrl, sitePages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = sitePages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const posts = articles.map((article) => ({
    url: absoluteUrl(`/ressources/${article.slug}`),
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const zones = cities.map((city) => ({
    url: absoluteUrl(`/zones/${city.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...posts, ...zones];
}
