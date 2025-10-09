import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 /**
  * Enable static exports.
  *
  * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
  */
 output: "export",

 /**
  * Set base path conditionally based on environment.
  * Only applies basePath in production/build, not in development.
  *
  * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
  */
 ...(process.env.NODE_ENV === "production" && {
  basePath: "/dashboard",
  assetPrefix: "/dashboard",
 }),

 /**
  * Disable server-based image optimization. Next.js does not support
  * dynamic features with static exports.
  *
  * @see https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
  */
 images: {
  unoptimized: true,
 },

 /**
  * Configure trailing slash for static exports compatibility
  */
 trailingSlash: true,
};

export default nextConfig;
