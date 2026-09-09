import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route is prerendered; `vinext build` writes the whole site to
  // dist/client, which Cloudflare Workers serves as static assets (see
  // wrangler.jsonc). Rewrites are not available in export mode — the
  // playable Bug Blaster game under public/bug-blaster/ is served as a
  // directory index by Cloudflare instead.
  output: "export",
  images: {
    // No request-time optimizer without a server; the handful of local
    // images are small enough to serve as-is.
    unoptimized: true,
  },
};

export default nextConfig;
