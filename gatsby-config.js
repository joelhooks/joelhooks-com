const remarkHighlight = require('remark-highlight.js');

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: 'https://joelhooks.com/',
    author: 'Joel Hooks',
    title: 'The blog of Joel Hooks',
    description: 'This is where I post my things.',
    keywords: ['Video Blogger'],
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/legacy_blog`,
        name: 'legacy',
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        mdPlugins: [remarkHighlight],
        extensions: ['.mdx', '.md', '.markdown'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Video Blogger',
        short_name: 'JHooks',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#525dce',
        display: 'standalone',
        icon: 'assets/logo.png',
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-246705-7`,
      },
    },
    'gatsby-plugin-offline',
  ],
};
