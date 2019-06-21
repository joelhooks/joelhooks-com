import React from 'react'
import { graphql } from 'gatsby'
import tw from 'tailwind.macro'
import { css } from '@emotion/core'

import Layout from 'components/Layout'
import Link from 'components/Link'
import Button from 'components/Button'
import Container from 'components/Container'
import { useTheme } from '../components/Theming'

export default function Index({ data: { site, allMdx } }) {
  const theme = useTheme()
  return (
    <Layout site={site}>
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        {allMdx.edges.map(({ node: post }) => (
          <div
            key={post.id}
            css={css(
              {
                ':first-of-type': {
                  marginTop: 0,
                },
              },
              tw`mt-8 sm:mt-12 lg:mt-16`,
            )}
          >
            <h2
              css={css(
                {
                  transition: 'all 150ms ease',
                  '@media (hover: hover)': {
                    ':hover': {
                      color: theme.colors.primary,
                    },
                  },
                },
                tw`mt-0 mb-4`,
              )}
            >
              <Link
                to={post.frontmatter.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                {post.frontmatter.title}
              </Link>
            </h2>
            <p css={css(tw`inline-block m-0`)}>{post.excerpt}</p>
            <span />
          </div>
        ))}
        <Button
          secondary
          to="/articles"
          aria-label="Visit blog page"
          css={css(tw`mt-8 md:mt-10 lg:mt-12`)}
        >
          Browse all articles
        </Button>
        <hr />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
        description
      }
    }
    allMdx(
      limit: 8
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
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
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
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
