import React from 'react'
import { rgba } from 'polished'
import styled from '@emotion/styled'
import { FiMoon, FiSun } from 'react-icons/fi'

import colors from '../lib/colors'
import { useTheme } from './Theming'
import Button from './Button'

const DarkMode = styled(FiMoon)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0',
})

const DefaultMode = styled(FiSun)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0',
})

const ThemeToggler = ({ toggleTheme, themeName }) => {
  const theme = useTheme()
  return (
    <Button
      css={{
        background: rgba(theme.colors.bodyColor, 0.05),
        borderRadius: '50%',
        width: '2.375rem',
        height: '2.375rem',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        color: theme.colors.bodyColor,
        '@media (hover: hover)': {
          ':hover': {
            color: colors.white,
          },
        },
      }}
      aria-label={
        themeName === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
      onClick={() => toggleTheme(themeName === 'dark' ? 'default' : 'dark')}
    >
      {themeName === 'dark' ? (
        <DefaultMode title="Switch to light mode" />
      ) : (
        <DarkMode title="Switch to dark mode" />
      )}
    </Button>
  )
}
export default ThemeToggler
