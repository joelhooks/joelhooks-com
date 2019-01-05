import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import Layout from '../components/Layout'

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
}) {
  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <div
        css={{
          width: '100%',
          margin: '0 auto',
          maxWidth: 600 + 32,
          paddingBottom: '50px',
        }}
      >
        <h1>{mdx.frontmatter.title}</h1>
        <p>
          <em>{mdx.frontmatter.date}</em>
        </p>

        {mdx.frontmatter.banner && (
          <Img
            sizes={mdx.frontmatter.banner.childImageSharp.sizes}
            alt={site.siteMetadata.keywords.join(', ')}
          />
        )}

        <MDXRenderer>{mdx.code.body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        banner {
          childImageSharp {
            sizes(maxWidth: 900) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        slug
        keywords
      }
      code {
        body
      }
    }
  }
`
