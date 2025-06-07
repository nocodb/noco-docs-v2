/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://nocodb.com',
  generateRobotsTxt: true,
  sitemapBaseFileName: 'sitemap-docs',
  sitemapSize: 7000
}
