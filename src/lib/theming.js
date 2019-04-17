import { createTheming } from '@callstack/react-theme-provider'
import { darken, lighten, rgba } from 'polished'

const colors = {
  pink: '#ff4094',
  black: '#131415',
  white: '#fff',
  gray: '#dedede',
}

const colorConsts = {}

const themes = {
  default: {
    themeName: 'default',
    colors: {
      primary: colors.pink,
      text: colors.black,
      bg: colors.white,

      ...colors,
    },
  },
  dark: {
    themeName: 'dark',
    colors: {
      primary: colors.pink,
      text: colors.white,
      bg: colors.black,

      ...colors,
    },
  },
}

const { ThemeProvider, useTheme } = createTheming(themes.default)

export { ThemeProvider, useTheme, themes }
