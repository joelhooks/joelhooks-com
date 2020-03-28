import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { rgba } from 'polished'
import { MDXProvider } from '@mdx-js/tag'
import tw from 'tailwind.macro'
import { Global, css } from '@emotion/core'
import useDarkMode from 'use-dark-mode'

import colors from '../lib/colors'
import { bpMinSM, bpMinLG } from '../lib/breakpoints'
import mdxComponents from './mdx'
import Header from './Header'
import reset from '../lib/reset'
import { fonts } from '../lib/typography'
import config from '../../config/website'
import Footer from '../components/Footer'

const Layout = ({ site, frontmatter = {}, children, noFooter }) => {
  const darkMode = useDarkMode()

  const {
    description: siteDescription,
    keywords: siteKeywords,
  } = site.siteMetadata

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter

  const keywords = (frontmatterKeywords || siteKeywords).join(', ')
  const description = frontmatterDescription || siteDescription

  return (
    <Fragment>
      <Global
        styles={css`
          :root {
            --color-black: ${colors.black};
            --color-white: ${colors.white};
            --color-pink: ${colors.pink};
            --color-gray: ${colors.gray};
            --color-primary: ${colors.primary};
            --color-body-color: ${darkMode.value ? colors.white : colors.black};
            --color-body-bg: ${darkMode.value ? colors.black : colors.white};
          }
          body {
            color: ${colors.black};
            background-color: ${colors.white};
            &.dark-mode {
              color: ${colors.white};
              background-color: ${colors.black};
            }
          }
          ::selection {
            color: ${colors.white};
            background-color: ${colors.primary};
          }
          a {
            color: ${colors.primary};
            @media (hover: hover) {
              &:hover,
              &:focus {
                color: ${colors.primary};
              }
            }
          }
          blockquote {
            border-left: 5px solid ${colors.primary};
          }
          caption {
            color: ${darkMode.value ? colors.black : colors.white};
          }
          h1 {
            font-size: 24px;
          }
          h2 {
            font-size: 22px;
          }
          ${bpMinSM} {
            h1 {
              font-size: 28px;
            }
            h2 {
              font-size: 26px;
            }
          }
          ${bpMinLG} {
            h1 {
              font-size: 30px;
            }
            h2 {
              font-size: 28px;
            }
          }
          hr {
            margin: 50px 0;
            border: none;
            border-top: 1px solid
              ${rgba(darkMode.value ? colors.white : colors.black, 0.2)};
            background: none;
          }
          em {
            font-family: ${fonts.regularItalic};
          }
          strong {
            font-family: ${fonts.semibold};
            font-weight: normal;
            em {
              font-family: inherit;
            }
          }
          h1,
          h2,
          h3,
          h4 {
            a {
              color: inherit;
            }
          }
          input {
            border-radius: 4px;
            border: 1px solid ${colors.gray};
            padding: 5px 10px;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
            font-family: ${fonts.regular};
            margin-top: 5px;
            ::placeholder {
              opacity: 0.4;
            }
          }
          .gatsby-resp-image-image {
            background: none !important;
            box-shadow: 0;
          }
          ${reset};
        `}
      />
      <div css={css(tw`flex flex-col w-full min-h-screen`)}>
        <Helmet
          htmlAttributes={{
            lang: 'en',
          }}
          title={config.siteTitle}
          meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
          ]}
        />
        <Header siteTitle={site.siteMetadata.title} />
        <MDXProvider components={mdxComponents}>
          <Fragment>{children}</Fragment>
        </MDXProvider>
        {noFooter || <Footer author={site.siteMetadata.author.name} />}
      </div>
    </Fragment>
  )
}

export default Layout

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author {
        name
      }
      keywords
    }
  }
`
