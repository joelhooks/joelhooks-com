import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from 'components/SEO'
import { css } from '@emotion/core'
import Container from 'components/Container'
import Layout from '../components/Layout'
import Share from '../components/Share'
import config from '../../config/website'
import { bpMaxSM, bpMinMD, bpMinLG } from '../lib/breakpoints'
import get from 'lodash/get'

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
}) {
  const author = mdx.frontmatter.author || config.author.name
  const date = mdx.frontmatter.date
  const title = mdx.frontmatter.title
  const banner = mdx.frontmatter.banner

  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <SEO
        excerpt={mdx.excerpt}
        postImage={get(banner, 'childImageSharp.fixed.src')}
        frontmatter={mdx.frontmatter}
        isBlogPost
      />
      <article
        css={css({
          width: '100%',
          display: 'flex',
          '.gatsby-resp-image-link': {
            margin: '0 -20px',
            [bpMinMD]: {
              margin: 0,
            },
          },
        })}
      >
        <Container>
          <h1
            css={css({
              textAlign: 'center',
              margin: '0 0 30px 0',
              [bpMinMD]: {
                margin: '0 0 50px 0',
              },
            })}
          >
            {title}
          </h1>
          {banner && (
            <div
              css={css({
                margin: '0 -20px 30px -20px',
                [bpMinMD]: {
                  width: '90%',
                  margin: '0 auto 50px auto',
                },
              })}
            >
              <Img
                sizes={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(', ')}
              />
            </div>
          )}
          <MDXRenderer>{mdx.code.body}</MDXRenderer>
        </Container>
        {/* <SubscribeForm /> */}
      </article>
      <Container noVerticalPadding>
        <Share
          url={`${config.siteUrl}/${mdx.frontmatter.slug}/`}
          title={title}
          twitterHandle={config.twitterHandle}
        />
        <br />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      excerpt(pruneLength: 240)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        banner {
          childImageSharp {
            fluid(maxWidth: 900) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            fixed(width: 500) {
              ...GatsbyImageSharpFixed
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
