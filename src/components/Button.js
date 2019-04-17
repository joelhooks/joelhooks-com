import { React } from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { useTheme } from '../lib/theming'
import { rgba, darken } from 'polished'

const Button = ({ to, children, secondary, ...restProps }) => {
  const theme = useTheme()
  const styles = css({
    display: 'inline-flex',
    border: 'none',
    borderRadius: '4px',
    background: secondary
      ? rgba(theme.colors.primary, 0.1)
      : theme.colors.primary,
    color: secondary ? theme.colors.primary : theme.colors.white,
    padding: '5px 10px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    ':hover': {
      color: theme.colors.white,
      background: darken(0.1, theme.colors.primary),
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
