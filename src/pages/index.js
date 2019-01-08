import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Layout from '../components/Layout'
import selfie from './selfie_stick.jpg'
import Link from '../components/Link'
import SEO from 'components/SEO'

export default function Index({ data: { site } }) {
  return (
    <Layout site={site}>
      <SEO />
      <div
        css={css`
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            max-width: 600px;
            1margin-top: 75px;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              margin-top: 75px;
            `}
          >
            <img
              css={css`
                padding-left: 15px;
              `}
              src={selfie}
              alt="joel hooks standing against a wall"
            />
          </div>
          <div
            css={css`
              margin-top: 15px;
            `}
          >
            <Link to="/blog">Blog Archive</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
  }
`
