import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { useTheme } from '../../config/theming'
import { bpMinSM, bpMinMD, bpMinLG, bpMinXL } from 'lib/breakpoints'
import Search from './Search'
import Container from './Container'
import Logo from './Logo'

const Header = ({ siteTitle, toggleTheme }) => {
  const theme = useTheme()
  return (
    <header
      css={css({
        width: '100%',
        flexShrink: 0,
        background: 'none',
        padding: '20px 0',
        background: theme.colors.primary,
        [bpMinMD]: {
          padding: '30px 0',
        },
        [bpMinLG]: {
          padding: '50px 0',
        },
      })}
    >
      <Container noVerticalPadding>
        <nav
          css={css`
            width: '100%';
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Link
            to="/"
            aria-label="go to homepage"
            activeClassName="active"
            css={css({
              display: 'flex',
              color: theme.colors.black,
              ':hover': {
                color: theme.colors.primary,
              },
              [bpMinXL]: {
                transform: 'translate(-70px, 0)',
              },
            })}
          >
            <Logo
              css={css({
                width: '60px',
                height: '49px',
                [bpMinMD]: {
                  width: '100px',
                  height: '82px',
                },
                [bpMinLG]: {
                  width: '140px',
                  height: '115px',
                },
              })}
            />
            <span
              css={css({
                display: 'none',
                margin: '20px 0 0 15px',
                fontSize: '14px',
                color: theme.colors.textColor,
                [bpMinSM]: {
                  display: 'block',
                },
                [bpMinMD]: {
                  margin: '42px 0 0 20px',
                  fontSize: '16px',
                },
                [bpMinLG]: {
                  margin: '60px 0 0 20px',
                  fontSize: '18px',
                },
              })}
            >
              {siteTitle}
            </span>
          </Link>
          <Search />
          <div
            style={{ color: theme.colors.secondary }}
            onClick={() => toggleTheme('dark')}
          >
            Hello
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
