import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[{
      protocol:"https",
      hostname:"images.ctfassets.net",
      pathname:"/niel5amhjp9m/**",
      port:""
    }]
  }
  /* config options here */
};

export default nextConfig;
