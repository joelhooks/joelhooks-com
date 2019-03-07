import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import theme from '../../config/theme'
import Search from './Search'
import Container from './Container'
import Logo from './Logo'

const Header = ({
  dark,
  bgColor = 'none',
  siteTitle,
  headerColor = 'black',
}) => (
  <header
    css={css`
      width: 100%;
      flex-shrink: 0;
      background: none;
      padding: 30px 0 0 0;
      background: ${dark ? '#090909' : `${bgColor}` || 'none'};
    `}
  >
    <Container noVerticalPadding>
      <nav
        css={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${headerColor};
        `}
      >
        <Link
          to="/"
          aria-label="go to homepage"
          activeClassName="active"
          css={css({
            color: theme.colors.black,
            ':hover': {
              color: theme.colors.primary,
            },
          })}
        >
          <Logo />
          <span
            css={css({
              color: headerColor ? headerColor : theme.colors.body_color,
            })}
          >
            {siteTitle}
          </span>
        </Link>
        <div
          css={css`
            font-size: 16px;
            line-height: 1.25;
            display: flex;
            align-items: center;
            a {
              color: ${dark ? '#fbfbfb' : 'rgba(0,0,0,0.85)'};
              text-decoration: none;
              & + a {
                margin-left: 32px;
              }
            }
            .active {
              display: none;
              visibility: hidden;
            }
          `}
        >
          {/*
          <Link
            to="/articles"
            activeClassName="active"
            aria-label="View articles page"
          >
            Articles
          </Link>
          */}
        </div>
        <Search />
      </nav>
    </Container>
  </header>
)

export default Header
