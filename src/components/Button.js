import { React } from 'react'
import { rgba, darken } from 'polished'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import colors from '../lib/colors'

const Button = ({ to, children, secondary, ...restProps }) => {
  const styles = css({
    display: 'inline-flex',
    border: 'none',
    borderRadius: '4px',
    background: secondary ? rgba(colors.primary, 0.2) : colors.primary,
    color: secondary ? colors.primary : colors.white,
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    '@media (hover: hover)': {
      ':hover': {
        color: colors.white,
        background: darken(0.1, colors.primary),
      },
    },
  })
  return to ? (
    <Link to={to} css={styles} {...restProps}>
      {children}
    </Link>
  ) : (
    <button css={styles} {...restProps}>
      {children}
    </button>
  )
}

export default Button
