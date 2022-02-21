import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from '../components/Layout'
import Link from '../components/Link'
import Button from '../components/Button'
import Container from '../components/Container'

import { ReactPlayer } from 'egghead-react-player'

export default function Index({ data: { site, file } }) {
  const title = site.siteMetadata.title
  const description = site.siteMetadata.description
  const image = site.siteMetadata.image
  const url = site.siteMetadata.canonicalUrl
  const { fbAppID, twitter } = site.siteMetadata.social

  return (
    <React.Fragment>
      <Helmet>
        {/* General tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="fb:app_id" content={fbAppID} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>

      <Layout site={site}>
        <Container
          css={css`
            padding-bottom: 0;
          `}
        >
          <div className="prose lg:prose-xl ">
          <MDXRenderer >{file.childMdx.body}</MDXRenderer>
          </div>
          <Button
            secondary
            to="/articles"
            aria-label="Visit blog page"
            className="mt-8 md:mt-10 lg:mt-12"
          >
            Browse all articles
          </Button>
          <hr />
        </Container>
      </Layout>
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
        description
        canonicalUrl
        image
        author {
          name
        }
        organization {
          name
          url
          logo
        }
        social {
          twitter
          fbAppID
        }
      }
    }
    file(relativePath: { eq:"home.mdx" }) {
      childMdx {
        body
      }
    }
  }
`
