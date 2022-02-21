import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { bpMinSM, bpMinMD, bpMinLG, bpMinXL } from '../lib/breakpoints'
import Search from './Search'
import Container from './Container'
import Logo from './Logo'
import ThemeToggler from './ThemeToggler'

import colors from '../lib/colors'

const Header = ({ siteTitle }) => {
  return (
    <header className="w-full flex-shrink-0 py-4 md:py-8 lg:py-12 bg-body">
      <Container noVerticalPadding>
        <nav className="w-full flex  justify-between items-center">
          <Link
            to="/"
            aria-label="go to homepage"
            activeClassName="active"
            className="flex text-body-color "
            css={css(
              {
                '@media (hover: hover)': {
                  ':hover': {
                    color: colors.primary,
                  },
                },
                [bpMinXL]: {
                  transform: 'translate(-70px, 0)',
                },
              },
            )}
          >
            <Logo
              css={css({
                width: '80px',
                height: '66px',
                [bpMinSM]: {
                  width: '100px',
                  height: '82px',
                },
                [bpMinMD]: {
                  width: '120px',
                  height: '99px',
                },
                [bpMinLG]: {
                  width: '140px',
                  height: '115px',
                },
              })}
            />
            <span
              className="hidden sm:block text-sm md:text-base lg:text-lg"
              css={css(
                {
                  margin: '20px 0 0 15px',
                  [bpMinSM]: {
                    margin: '40px 0 0 15px',
                  },
                  [bpMinMD]: {
                    margin: '50px 0 0 20px',
                  },
                  [bpMinLG]: {
                    margin: '60px 0 0 20px',
                  },
                },
              )}
            >
              {siteTitle}
            </span>
          </Link>
          <div
            css={{
              display: 'flex',
              marginTop: '20px',
              [bpMinSM]: {
                marginTop: '20px',
              },
              [bpMinMD]: {
                marginTop: '30px',
              },
              [bpMinLG]: {
                margin: '40px 0 0 20px',
              },
            }}
          >
            <Search />
            {/*<ThemeToggler />*/}
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
