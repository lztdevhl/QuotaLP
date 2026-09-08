import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  // The OpenGraph route reads the original PNG from disk in a Vercel function.
  outputFileTracingIncludes: {
    "/*": ["./public/product/social-codex.png"],
  },
};
export default config;
