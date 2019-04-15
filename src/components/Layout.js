import React, { Fragment, useState } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/tag'
import { Global, css } from '@emotion/core'
import { ThemeProvider, themes } from '../../config/theming'
import { bpMaxSM } from '../lib/breakpoints'
import mdxComponents from './mdx'
import Header from './Header'
import reset from '../lib/reset'
import { fonts } from '../lib/typography'
import config from '../../config/website'
import Footer from '../components/Footer'

const Layout = ({
  site,
  frontmatter = {},
  children,
  dark,
  headerBg,
  headerColor,
  noFooter,
}) => {
  const [themeName, setTheme] = useState('default')
  const toggleTheme = name => setTheme(name)

  const theme = themes[themeName]

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
    <ThemeProvider theme={themes[themeName]}>
      <Fragment>
        <Global
          styles={css`
            body {
              color: ${theme.text};
              background-color: ${theme.bodyBg};
            }
            ::selection {
              color: ${theme.white};
              background-color: ${theme.link};
            }
            a {
              color: ${theme.link};
              transition: all 0.3s ease-in-out;
              &:hover,
              &:focus {
                color: ${theme.linkHover};
              }
            }
            blockquote {
              border-left: 5px solid ${theme.link};
            }
            caption {
              color: ${theme.bodyBg};
            }

            .button-secondary {
              border-radius: 4px;
              padding: 12px 12px;
              background: ${theme.primaryLight};
            }
            ${bpMaxSM} {
              h1 {
                font-size: 28px;
              }
              h2 {
                font-size: 24px;
              }
            }
            hr {
              margin: 50px 0;
              border: none;
              border-top: 1px solid ${theme.gray};
              background: none;
            }
            em {
              font-family: ${fonts.regularItalic};
            }
            strong {
              em {
                font-family: ${fonts.semiboldItalic};
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
              border: 1px solid ${theme.gray};
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
            button {
              border-radius: 4px;
              background-color: ${theme.primary};
              border: none;
              color: ${theme.white};
              padding: 5px 10px;
              cursor: pointer;
              border: 1px solid ${theme.primary};
              transition: all 200ms ease;
              :hover {
                background: ${theme.linkHover};
                border: 1px solid ${theme.linkHover};
              }
            }
            pre {
              background-color: #061526 !important;
              border-radius: 4px;
              font-size: 16px;
              padding: 10px;
              overflow-x: auto;
              /* Track */
              ::-webkit-scrollbar {
                width: 100%;
                height: 5px;
                border-radius: 0 0 5px 5px;
              }
              ::-webkit-scrollbar-track {
                background: #061526;
                border-radius: 0 0 4px 4px;
                border: 1px solid rgba(0, 0, 0, 0.2);
              }
              /* Handle */
              ::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 5px;
              }
            }
            ${reset};
          `}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100vh;
          `}
        >
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
          <Header
            siteTitle={site.siteMetadata.title}
            dark={dark}
            bgColor={headerBg}
            headerColor={headerColor}
            toggleTheme={toggleTheme}
          />
          <MDXProvider components={mdxComponents}>
            <Fragment>{children}</Fragment>
          </MDXProvider>
          {!noFooter && <Footer author={site.siteMetadata.author.name} />}
        </div>
      </Fragment>
    </ThemeProvider>
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
