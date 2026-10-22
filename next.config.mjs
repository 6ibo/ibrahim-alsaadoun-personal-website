const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserSite = repo?.endsWith(".github.io");
const basePath = process.env.NODE_ENV === "production"
  ? (process.env.NEXT_PUBLIC_BASE_PATH ?? (repo && !isUserSite ? `/${repo}` : ""))
  : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};
export default nextConfig;
