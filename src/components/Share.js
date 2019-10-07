import React from 'react'
import { css } from '@emotion/core'

import colors from '../lib/colors'
import { useTheme } from './Theming'

import { TwitterIcon, TwitterShareButton } from 'react-share'

const Share = ({ url, title, twitterHandle }) => {
  const theme = useTheme()
  return (
    <div>
      <div
        css={css`
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
        `}
      >
        <div
          css={css`
            padding-bottom: 25px;
          `}
        >
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
            <div
              css={css`
                padding-left: 10px;
              `}
            >
              <strong>
                ✨✨ click here to share this article with your friends on
                Twitter ✨✨
              </strong>
            </div>
          </TwitterShareButton>
        </div>
        <div
          css={css`
            padding-top: 10px;
            opacity: 0.7;
            max-width: 75%;
            font-size: 12px;
          `}
        >
          <strong>This site isn't collecting analytics</strong>. 0. It's a huge
          help to me if you share it on Twitter if you enjoy it. That way other
          people can also enjoy it and I notice that it was enjoyed. 🙏
        </div>
      </div>
    </div>
  )
}

export default Share
