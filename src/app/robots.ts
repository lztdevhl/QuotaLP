import type { MetadataRoute } from "next";
import { SITE_URL, IS_INDEXABLE } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(IS_INDEXABLE ? { allow: "/" } : { disallow: "/" }),
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
