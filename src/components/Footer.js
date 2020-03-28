import React from 'react'
import tw from 'tailwind.macro'
import { css } from '@emotion/core'
import useDarkMode from 'use-dark-mode'
import SubscribeForm from './Forms/SubscribeForm'
import { Twitter, GitHub } from './Social'
import Container from './Container'

import colors from '../lib/colors'

const Footer = ({ author }) => {
  const darkMode = useDarkMode()
  return (
    <footer>
      <Container noVerticalPadding>
        <SubscribeForm
          css={css(tw`mt-10 sm:mt-12`)}
          darkMode={darkMode.value}
        />
        <div
          css={css(
            tw`flex justify-between items-center pt-12 pb-8 sm:pt-16 sm:pb-10`,
          )}
        >
          <div
            css={css({
              fontSize: '90%',
              opacity: 0.7,
            })}
          >
            {author && `${author} \u00A9 ${new Date().getFullYear()}`}
          </div>
          <div>
            <Twitter
              className="social-btn"
              color={colors.black}
              hover={colors.primary}
            />
            <GitHub
              className="social-btn"
              color={colors.black}
              hover={colors.primary}
            />
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
