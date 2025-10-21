/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://nocodb.com',
  generateRobotsTxt: true,
  sitemapBaseFileName: 'sitemap-docs',
  generateIndexSitemap: false,
  exclude: [
    // Static assets
    '*.js',
    '*.css',
    '*.xml',
    '*.json',
    '*.less',
    '*.png',
    '*.jpg',
    '*.jpeg',
    '*.gif',
    '*.pdf',
    '*.doc',
    '*.txt',
    '*.ico',
    '*.svg',
    '*.woff',
    '*.woff2',
    '*.ttf',
    '*.eot',
    // Admin/internal pages
    '/_next/*',
    '/_vercel/*',
    '/*llms.mdx/*',
    // Error pages
    '/404',
    '/500',
    '/error',
    // Other exclusions
    '/sitemap*.xml',
    '/robots.txt',
    '/favicon.ico',
    '/manifest.json',
    // Development/testing paths
    '/.well-known/*',
    // exclude root url since it's part of main sitemap
    '/',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/_next/*',
          '/_vercel/*',
          '/private/*'
        ]
      }
    ]
  }
}
