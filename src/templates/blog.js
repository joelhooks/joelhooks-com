import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import Container from 'components/Container'
import SEO from 'components/SEO'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { bpMaxSM, bpMinMD } from '../lib/breakpoints'
import { useTheme } from 'components/Theming'

const Blog = ({ data: { site, allMdx }, pageContext: { pagination } }) => {
  const { page, nextPagePath, previousPagePath } = pagination

  const posts = page
    .map(id =>
      allMdx.edges.find(
        edge =>
          edge.node.id === id &&
          edge.node.parent.sourceInstanceName !== 'pages',
      ),
    )
    .filter(post => post !== undefined)

  return (
    <Layout site={site}>
      <SEO />
      <Container
        noVerticalPadding
        css={css`
          a,
          p {
          }
          h2 {
            a {
              color: inherit;
            }
          }
          small {
            display: block;
          }
        `}
      >
        {posts.map(({ node: post }) => (
          <div
            key={post.id}
            css={css`
              :not(:first-of-type) {
                ${bpMaxSM} {
                  margin-top: 20px;
                }
              }
              :first-of-type {
                margin-top: 20px;
                ${bpMaxSM} {
                  margin-top: 20px;
                }
              }
              margin-top: 40px;
              ${bpMaxSM} {
                padding: ${post.frontmatter.banner
                  ? '0 20px 20px 20px'
                  : '20px'};
              }
              display: flex;
              flex-direction: column;
            `}
          >
            {post.frontmatter.banner && (
              <div>
                <Link
                  aria-label={`View ${post.frontmatter.title} article`}
                  to={`/${post.fields.slug}`}
                >
                  <Img sizes={post.frontmatter.banner.childImageSharp.fluid} />
                </Link>
              </div>
            )}
            <h2>
              <Link
                aria-label={`View ${post.frontmatter.title} article`}
                to={`/${post.fields.slug}`}
              >
                {post.frontmatter.title}
              </Link>
            </h2>
            {/* <small>{post.frontmatter.date}</small> */}
            <p>{post.excerpt}</p>
            <Link
              to={`/${post.fields.slug}`}
              aria-label={`Read ${post.frontmatter.title}`}
            >
              Read Article
            </Link>
          </div>
        ))}
        <div
          css={css({
            marginTop: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            [bpMaxSM]: {
              marginTop: '30px',
            },
          })}
        >
          {previousPagePath ? (
            <Link to={previousPagePath} aria-label="View previous page">
              ← Previous Page
            </Link>
          ) : (
            <div />
          )}
          {nextPagePath && (
            <Link to={nextPagePath} aria-label="View next page">
              Next Page →
            </Link>
          )}
        </div>
        <hr
          css={css`
            margin: 50px 0;
          `}
        />
      </Container>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 300)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            banner {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`
