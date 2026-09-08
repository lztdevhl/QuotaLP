import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveDeployment } from "../src/lib/deployment.ts";

test("local build stays on localhost and is not indexable", () => {
  assert.deepEqual(resolveDeployment({ NODE_ENV: "production" }), {
    siteUrl: "http://localhost:3000",
    indexable: false,
  });
});
test("Vercel production uses the stable project domain", () => {
  assert.deepEqual(
    resolveDeployment({
      VERCEL_ENV: "production",
      VERCEL_PROJECT_PRODUCTION_URL: "quota-example.vercel.app",
      VERCEL_URL: "preview-example.vercel.app",
    }),
    { siteUrl: "https://quota-example.vercel.app", indexable: true },
  );
});
test("preview keeps production canonical but never enables indexing", () => {
  assert.deepEqual(
    resolveDeployment({
      VERCEL_ENV: "preview",
      NEXT_PUBLIC_SITE_URL: "https://quota.example/",
      VERCEL_URL: "preview-example.vercel.app",
    }),
    { siteUrl: "https://quota.example", indexable: false },
  );
});
test("a deployment-only URL is a safe noindex fallback", () => {
  assert.deepEqual(
    resolveDeployment({
      VERCEL_ENV: "production",
      VERCEL_URL: "deployment-example.vercel.app",
    }),
    { siteUrl: "https://deployment-example.vercel.app", indexable: false },
  );
});
test("explicit public origin overrides the generated Vercel origin", () => {
  assert.deepEqual(
    resolveDeployment({
      VERCEL_ENV: "production",
      NEXT_PUBLIC_SITE_URL: " https://quota.example/ ",
      VERCEL_PROJECT_PRODUCTION_URL: "quota-example.vercel.app",
    }),
    { siteUrl: "https://quota.example", indexable: true },
  );
});
test("development and localhost never enable indexing", () => {
  assert.equal(
    resolveDeployment({
      VERCEL_ENV: "development",
      NEXT_PUBLIC_SITE_URL: "https://quota.example",
    }).indexable,
    false,
  );
  assert.equal(
    resolveDeployment({
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    }).indexable,
    false,
  );
});
test("invalid origins fail early instead of publishing broken SEO", () => {
  for (const value of [
    "quota.example",
    "ftp://quota.example",
    "https://quota.example/path",
    "https://user:pass@quota.example",
    "https://quota.example?x=1",
    "https://quota.example#fragment",
  ]) {
    assert.throws(() => resolveDeployment({ NEXT_PUBLIC_SITE_URL: value }));
  }
});
