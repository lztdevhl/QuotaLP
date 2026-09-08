type DeploymentEnvironment = Record<string, string | undefined>;

/** Pure configuration resolver, shared by metadata, robots and sitemap. */
export function resolveDeployment(env: DeploymentEnvironment) {
  const configured = env.NEXT_PUBLIC_SITE_URL?.trim();
  const productionHost = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const deploymentHost = env.VERCEL_URL?.trim();
  const raw =
    configured ||
    (productionHost
      ? `https://${productionHost}`
      : deploymentHost
        ? `https://${deploymentHost}`
        : "http://localhost:3000");
  const url = new URL(raw);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without credentials, path, query or fragment.",
    );
  }
  const local =
    ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) ||
    url.hostname.endsWith(".localhost");
  const production = env.VERCEL_ENV
    ? env.VERCEL_ENV === "production"
    : env.NODE_ENV === "production";
  return {
    siteUrl: url.origin,
    indexable: Boolean((configured || productionHost) && !local && production),
  };
}
