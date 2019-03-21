import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Container from 'components/Container'
import { rhythm } from '../lib/typography'
import theme from '../../config/theme'

const Hero = ({ description }) => (
  <section
    css={css`
      * {
        color: ${theme.colors.white};
      }
      width: 100%;
      background: ${theme.brand.primary};
      padding: 20px 0 30px 0;
      display: flex;
    `}
  >
    <Container
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <h1
        css={css`
          position: relative;
          z-index: 5;
          line-height: 1.5;
          margin: 0;
          max-width: ${rhythm(15)};
        `}
      >
        {description}
      </h1>
    </Container>
    <div
      css={css`
        height: 150px;
        overflow: hidden;
      `}
    />
  </section>
)

const Description = styled.p`
  margin-bottom: 10px;
  display: inline-block;
`

export default function Index({ data: { site, allMdx } }) {
  return (
    <Layout
      site={site}
      headerColor={theme.colors.black}
      headerBg={theme.colors.white}
    >
      {/* <Hero /> */}
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        {allMdx.edges.map(({ node: post }) => (
          <div
            key={post.id}
            css={css`
              margin-bottom: 40px;
            `}
          >
            <h2
              css={css({
                marginBottom: rhythm(0.3),
                transition: theme.transition.ease,
                ':hover': {
                  color: theme.brand.primary,
                },
              })}
            >
              <Link
                to={post.frontmatter.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                {post.frontmatter.title}
              </Link>
            </h2>
            <Description>
              {post.excerpt}{' '}
              <Link
                to={post.frontmatter.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                Read Article →
              </Link>
            </Description>
            <span />
          </div>
        ))}
        <Link
          to="/articles"
          aria-label="Visit blog page"
          className="button-secondary"
        >
          View all articles
        </Link>
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
      limit: 5
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
