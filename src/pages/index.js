import React from 'react'
import {graphql} from 'gatsby'
import tw from 'tailwind.macro'
import {css} from '@emotion/core'

import Layout from 'components/Layout'
import Link from 'components/Link'
import Button from 'components/Button'
import Container from 'components/Container'
import {useTheme} from '../components/Theming'
import Home from './home.mdx'

import {ReactPlayer} from 'egghead-react-player'

export default function Index({data: {site, allMdx}}) {
  const theme = useTheme()
  return (
    <Layout site={site}>
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        <Home />
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
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {published: {ne: false}}}
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
