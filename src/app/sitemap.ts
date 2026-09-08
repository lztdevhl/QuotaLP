import type { MetadataRoute } from "next";
import { SITE_URL, paths } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(paths)
    .flatMap((p) => [p.home, p.privacy])
    .map((path) => ({ url: `${SITE_URL}${path}` }));
}
