import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/docs/product-docs/:path*.mdx",
        destination: "/llms.mdx/product-docs/:path*",
      },
      {
        source: "/docs/scripts/:path*.mdx",
        destination: "/llms.mdx/scripts/:path*",
      },
      {
        source: "/docs/self-hosting/:path*.mdx",
        destination: "/llms.mdx/self-hosting/:path*",
      },
      {
        source: "/docs/changelog/:path*.mdx",
        destination: "/llms.mdx/changelog/:path*",
      },
      {
        source: "/docs/legal/:path*.mdx",
        destination: "/llms.mdx/legal/:path*",
      },
    ];
  },
  async redirects() {
    return [
      // Redirects for renamed webhook pages
      {
        source: "/docs/product-docs/automation/webhook/webhook-overview",
        destination: "/docs/product-docs/automation/webhook",
        permanent: true,
      },
      {
        source:
          "/docs/product-docs/automation/webhook-v2-deprecated/webhook-overview",
        destination: "/docs/product-docs/automation/webhook-v2-deprecated",
        permanent: true,
      },
      // Redirect for moved self-hosted content
      {
        source: "/docs/product-docs/getting-started/self-hosted",
        destination: "/docs/self-hosting",
        permanent: true,
      },
      // Redirects for engineering filename changes
      {
        source: "/docs/product-docs/engineering/build-and-releases",
        destination: "/docs/product-docs/engineering/builds-and-releases",
        permanent: true,
      },
      {
        source: "/docs/product-docs/engineering/translations",
        destination: "/docs/product-docs/engineering/translation",
        permanent: true,
      },
      // Getting Started: quick-start → index
      {
        source: "/docs/product-docs/getting-started/quick-start",
        destination: "/docs/product-docs/getting-started",
        permanent: true,
      },
      // Overview → Index renames from recent git history
      {
        source: "/docs/product-docs/account-settings/authentication/overview",
        destination: "/docs/product-docs/account-settings/authentication",
        permanent: true,
      },
      {
        source: "/docs/product-docs/bases/base-overview",
        destination: "/docs/product-docs/bases",
        permanent: true,
      },
      {
        source: "/docs/product-docs/collaboration/collaboration-overview",
        destination: "/docs/product-docs/collaboration",
        permanent: true,
      },
      {
        source: "/docs/product-docs/data-sources/data-source-overview",
        destination: "/docs/product-docs/data-sources",
        permanent: true,
      },
      {
        source: "/docs/product-docs/extensions/overview",
        destination: "/docs/product-docs/extensions",
        permanent: true,
      },
      {
        source: "/docs/product-docs/fields/fields-overview",
        destination: "/docs/product-docs/fields",
        permanent: true,
      },
      {
        source: "/docs/product-docs/integrations/overview",
        destination: "/docs/product-docs/integrations",
        permanent: true,
      },
      {
        source: "/docs/product-docs/records/records-overview",
        destination: "/docs/product-docs/records",
        permanent: true,
      },
      {
        source:
          "/docs/product-docs/roles-and-permissions/roles-permissions-overview",
        destination: "/docs/product-docs/roles-and-permissions",
        permanent: true,
      },
      {
        source: "/docs/product-docs/table-details/table-details-overview",
        destination: "/docs/product-docs/table-details",
        permanent: true,
      },
      {
        source: "/docs/product-docs/table-operations/overview",
        destination: "/docs/product-docs/table-operations",
        permanent: true,
      },
      {
        source: "/docs/product-docs/tables/table-overview",
        destination: "/docs/product-docs/tables",
        permanent: true,
      },
      {
        source: "/docs/product-docs/views/views-overview",
        destination: "/docs/product-docs/views",
        permanent: true,
      },
      {
        source: "/docs/product-docs/workspaces/workspace-overview",
        destination: "/docs/product-docs/workspaces",
        permanent: true,
      },
      {
        source: "/docs/product-docs/automation/scripts/overview",
        destination: "/docs/product-docs/automation/scripts",
        permanent: true,
      },
      // Scripts API restructure: api → api-reference
      {
        source: "/docs/scripts/api/:path*",
        destination: "/docs/scripts/api-reference/:path*",
        permanent: true,
      },
      // Field type moves: select-based → custom-types
      {
        source: "/docs/product-docs/fields/field-types/select-based/checkbox",
        destination:
          "/docs/product-docs/fields/field-types/custom-types/checkbox",
        permanent: true,
      },
      {
        source: "/docs/product-docs/fields/field-types/select-based/rating",
        destination:
          "/docs/product-docs/fields/field-types/custom-types/rating",
        permanent: true,
      },
      // Developer resources webhook moved to automation
      {
        source: "/docs/product-docs/developer-resources/webhook/:path*",
        destination: "/docs/product-docs/automation/webhook/:path*",
        permanent: true,
      },
      // Developer resources REST API overview
      {
        source: "/docs/product-docs/developer-resources/rest-apis/overview",
        destination: "/docs/product-docs/developer-resources/rest-apis",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "elest.io",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "d16t0pc4846x52.cloudfront.net",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media.tenor.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default withMDX(config);
