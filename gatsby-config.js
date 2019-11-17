const config = require('./config/website')
const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    title: config.siteTitle,
    twitterHandle: config.twitterHandle,
    description: config.siteDescription,
    keywords: ['Video Blogger'],
    canonicalUrl: config.siteUrl,
    image: config.siteLogo,
    author: config.author,
    organization: {
      name: config.organization,
      url: config.siteUrl,
      logo: config.siteLogo,
    },
    social: {
      twitter: config.twitterHandle,
      fbAppID: '',
    },
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
        ignore: [`**/readme.md`],
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        globalScope: `
          import ResponsiveEmbed from "react-responsive-embed";
          import { TwitterTweetEmbed } from "react-twitter-embed";

          export default { ResponsiveEmbed, TwitterTweetEmbed };
        `,
        extensions: ['.mdx', '.md', '.markdown'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: '#fafafa',
              maxWidth: 1035,
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
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.edges.map(edge =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.fields.date,
                  url: `${site.siteMetadata.siteUrl}/${edge.node.fields.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/${edge.node.fields.slug}`,
                }),
              ),
            query: `
              {
                allMdx(
                  limit: 1000,
                  filter: { frontmatter: { published: { ne: false }, hidden: { ne: true } } }
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      fields { 
                        slug
                        date
                      }
                      frontmatter {
                        title
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Blog RSS Feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/lib/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
        queries: [
          {
            query: `
            {
              allMdx(
                filter: { frontmatter: { hidden: { ne: true } } }

              ) {
                edges {
                  node {
                    id
                    rawBody
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      description
                    }
                  }
                }
              }
            }
          `,
            transformer: ({ data }) =>
              data.allMdx.edges.reduce((records, { node }) => {
                const { title, description } = node.frontmatter
                const { slug } = node.fields

                const base = { slug, title, description }
                const chunks = node.rawBody.split('\n\n')

                return [
                  ...records,
                  ...chunks.map((text, index) => ({
                    ...base,
                    objectID: `${slug}-${index}`,
                    text,
                  })),
                ]
              }, []),
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        siteId: process.env.FATHOM_SITE_ID,
      },
    },
    'gatsby-plugin-offline',
  ],
}
