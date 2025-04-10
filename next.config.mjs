import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
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
        },
      ],
    }
};

export default withMDX(config);
