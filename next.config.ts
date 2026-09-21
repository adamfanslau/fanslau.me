import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route is prerendered; `vinext build` writes the whole site to
  // dist/client, which Cloudflare Workers serves as static assets (see
  // deploy/wrangler.jsonc). Rewrites and redirects are not available in
  // export mode; the few we need live in public/_redirects.
  output: "export",
  images: {
    // No request-time optimizer without a server; the handful of local
    // images are small enough to serve as-is.
    unoptimized: true,
  },
};

export default nextConfig;
