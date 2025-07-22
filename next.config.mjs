import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Redirects for renamed webhook pages
      {
        source: '/docs/product-docs/automation/webhook/webhook-overview',
        destination: '/docs/product-docs/automation/webhook',
        permanent: true,
      },
      {
        source: '/docs/product-docs/automation/webhook-v2-deprecated/webhook-overview',
        destination: '/docs/product-docs/automation/webhook-v2-deprecated',
        permanent: true,
      },
      // Redirect for moved self-hosted content
      {
        source: '/docs/product-docs/getting-started/self-hosted',
        destination: '/docs/self-hosting',
        permanent: true,
      },
      // Redirects for engineering filename changes
      {
        source: '/docs/product-docs/engineering/build-and-releases',
        destination: '/docs/product-docs/engineering/builds-and-releases',
        permanent: true,
      },
      {
        source: '/docs/product-docs/engineering/translations',
        destination: '/docs/product-docs/engineering/translation',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        port: '',
        pathname: '**',
      },
        {
        protocol: 'https',
        hostname: 'elest.io',
        port: '',
        pathname: '**',
      },
        {
        protocol: 'https',
        hostname: 'd16t0pc4846x52.cloudfront.net',
        port: '',
        pathname: '**',
      },{
        protocol: 'https',
        hostname: 'media.tenor.com',
        port: '',
        pathname: '**',
      },{
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '**',
      }
    ],
  },
};

export default withMDX(config);
