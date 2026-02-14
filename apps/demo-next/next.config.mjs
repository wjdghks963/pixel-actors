/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserPageRepo = repoName.endsWith(".github.io");
const basePath = isGithubPages && repoName && !isUserPageRepo ? `/${repoName}` : "";

const nextConfig = {
  transpilePackages: ["@wjdghks963/pixel-actors-core", "@wjdghks963/pixel-actors-react"],
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined
};

export default nextConfig;
