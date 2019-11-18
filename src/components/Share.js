import React from 'react'
import { css } from '@emotion/core'
import { useTheme } from './Theming'
import fonts from '../lib/typography'

import { TwitterIcon, TwitterShareButton } from 'react-share'
import SparklingCandy from './SparklingCandy'

const Share = ({ url, title, twitterHandle }) => {
  const theme = useTheme()
  return (
    <div>
      <div
        css={{
          margin: '3rem auto',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '25rem',
        }}
      >
        <SparklingCandy />

        <TwitterShareButton
          url={url}
          title={title}
          via={twitterHandle.split('@').join('')}
          css={css`
            cursor: pointer;
            :hover {
              color: ${theme.colors.primary};
            }
          `}
        >
          <h2
            css={{
              margin: '1rem 0',
              fontFamily: fonts.semibold,
              span: {
                color: theme.colors.primary,
              },
            }}
          >
            <span>Click here</span> to share this article with your friends on
            Twitter.
          </h2>
        </TwitterShareButton>

        <small
          css={{
            opacity: 0.7,
          }}
        >
          Share this article on Twitter if it was useful. It's a big help to me.
          <span role="img" aria-label="praying hands">
            🙏
          </span>
        </small>
      </div>
    </div>
  )
}

export default Share
