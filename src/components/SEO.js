import path from 'path'
import React from 'react'
import Helmet from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'
import PropTypes from 'prop-types'
import SchemaOrg from './SchemaOrg'

const SEO = ({postData, excerpt, frontmatter = {}, postImage, isBlogPost}) => (
  <StaticQuery
    query={graphql`
      {
        site {
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
      }
    `}
    render={({site: {siteMetadata: seo}}) => {
      const postMeta =
        frontmatter || postData.childMarkdownRemark.frontmatter || {}

      const title = postMeta.title || seo.title
      const description = postMeta.description || excerpt || seo.description
      const image = postImage ? `${seo.canonicalUrl}${postImage}` : seo.image
      const url = postMeta.slug
        ? `${seo.canonicalUrl}${path.sep}${postMeta.slug}`
        : seo.canonicalUrl
      const datePublished = isBlogPost ? postMeta.datePublished : false
      const {fbAppID, twitter} = seo.social
      const ogImage = `https://competent-goodall-d71d0d.netlify.app/opengraph?title=${encodeURIComponent(
        title,
      )}&author=${encodeURIComponent(twitter)}&v=0.0.8`

      return (
        <React.Fragment>
          <Helmet>
            {/* General tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="image" content={ogImage} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            {isBlogPost ? <meta property="og:type" content="article" /> : null}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={excerpt || description} />
            <meta property="og:image" content={ogImage} />
            <meta property="fb:app_id" content={fbAppID} />

            {/* Twitter Card tags */}
            <meta
              name="twitter:card"
              content={isBlogPost ? 'summary_large_image' : 'summary'}
            />
            <meta name="twitter:creator" content={twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={excerpt || description} />
            <meta name="twitter:image" content={ogImage} />
          </Helmet>
          <SchemaOrg
            isBlogPost={isBlogPost}
            url={url}
            title={title}
            image={image}
            description={description}
            datePublished={datePublished}
            canonicalUrl={seo.canonicalUrl}
            author={seo.author}
            organization={seo.organization}
            defaultTitle={seo.title}
          />
        </React.Fragment>
      )
    }}
  />
)

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any,
    }),
  }),
  postImage: PropTypes.string,
}

SEO.defaultProps = {
  isBlogPost: false,
  postData: {childMarkdownRemark: {}},
  postImage: null,
}

export default SEO
