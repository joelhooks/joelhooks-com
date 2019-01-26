module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: 'https://joelhooks.com/',
    title: 'Joel Hooks - Video Blogger',
    description:
      'Articles and notes from the co-founder of egghead.io. Musings on software, business, and life.',
    canonicalUrl: 'https://joelhooks.com',
    image: 'https://joelhooks.com/images/joel-hooks.jpg',
    author: {
      name: 'Joel Hooks',
      minibio: `
        <strong>Joel Hooks</strong> is a principle developer and co-founder at egghead.io.
        He is a published author, international speaker, and has been building UIs for 
        20+ years. Joel lives in Vancouver WA with his partner and their 5 kids.
      `,
    },
    organization: {
      name: 'Joel Hooks',
      url: 'https://joelhooks.com',
      logo: 'https://joelhooks.com/android-chrome-512x512.png',
    },
    keywords: ['Video Blogger'],
    social: {
      twitter: '@jhooks',
      fbAppID: '',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
        ignore: [`**/readme.md`],
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
        extensions: ['.mdx', '.md', '.markdown'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1024,
              linkImagesToOriginal: false,
            },
          },
          { resolve: 'gatsby-remark-copy-linked-files' },
          { resolve: 'gatsby-remark-numbered-footnotes' },
          { resolve: 'gatsby-remark-smartypants' },
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Joel Hooks',
        short_name: '@JHooks',
        start_url: '.',
        background_color: '#fff',
        theme_color: '#525dce',
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png?v=6946GROn29',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png?v=6946GROn29',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-246705-7`,
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
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.fields.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                })
              })
            },
            query: `
              {
                allMdx(
                  limit: 1000,
                  filter: { frontmatter: { published: { ne: false } } }
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
            title: 'Joel Hooks Blog RSS Feed',
          },
        ],
      },
    },
  ],
}
