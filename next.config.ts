import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // public/ serves files, not directory indexes — route the playable
      // Bug Blaster game to its built index.html.
      { source: "/bug-blaster", destination: "/bug-blaster/index.html" },
    ];
  },
};

export default nextConfig;
