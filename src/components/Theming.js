import { createTheming } from '@callstack/react-theme-provider'
import colors from '../lib/colors'

const themes = {
  default: {
    themeName: 'default',
    colors: {
      primary: colors.pink,
      bodyColor: colors.black,
      bodyBg: colors.white,
    },
  },
  dark: {
    themeName: 'dark',
    colors: {
      primary: colors.pink,
      bodyColor: colors.white,
      bodyBg: colors.black,
    },
  },
}

const { ThemeProvider, withTheme, useTheme } = createTheming(themes.default)

export { ThemeProvider, withTheme, useTheme, themes }
