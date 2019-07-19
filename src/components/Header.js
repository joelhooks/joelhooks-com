import React from 'react'
import { Link } from 'gatsby'
import tw from 'tailwind.macro'
import { css } from '@emotion/core'
import { useTheme } from './Theming'
import { bpMinSM, bpMinMD, bpMinLG, bpMinXL } from 'lib/breakpoints'
import Search from './Search'
import Container from './Container'
import Logo from './Logo'
import ThemeToggler from './ThemeToggler'

const Header = ({ siteTitle }) => {
  const theme = useTheme()
  return (
    <header css={css(tw`w-full flex-shrink-0 py-4 md:py-8 lg:py-12 bg-body`)}>
      <Container noVerticalPadding>
        <nav css={css(tw`w-full flex justify-between items-center`)}>
          <Link
            to="/"
            aria-label="go to homepage"
            activeClassName="active"
            css={css(
              {
                '@media (hover: hover)': {
                  ':hover': {
                    color: theme.colors.primary,
                  },
                },
                [bpMinXL]: {
                  transform: 'translate(-70px, 0)',
                },
              },
              tw`flex text-body-color`,
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
              baseColor={theme.colors.bodyColor}
              altColor={theme.colors.bodyBg}
            />
            <span
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
                tw`hidden sm:block text-sm md:text-base lg:text-lg`,
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

            <ThemeToggler
              css={{}}
              toggleTheme={theme.toggleTheme}
              themeName={theme.themeName}
            />
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
