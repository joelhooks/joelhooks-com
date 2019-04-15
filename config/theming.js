import { createTheming } from '@callstack/react-theme-provider'
import { darken, lighten, rgba } from 'polished'

const colors = {
  black: '#000',
  white: '#fff',
  primaryColorDefault: '#ff4094',
  primaryColorDark: '#333333',
  secondaryColorDefault: '#eef4f2',
  secondaryColorDark: '#888888',
}

const themes = {
  default: {
    themeName: 'default',
    primaryColor: primaryColorDefault,
    secondaryColor: secondaryColorDefault,
    textColor: rgba(colors.black, 0.85),
    linkColor: primaryColorDefault,
    linkColorHover: `${darken(0.07, primaryColorDefault)}`,
  },
  dark: {
    themeName: 'dark',
    primaryColor: primaryColorDark,
    secondaryColor: secondaryColorDark,
    textColor: rgba(colors.black, 0.85),
    linkColor: primaryColorDark,
    linkColorHover: `${darken(0.07, primaryColorDark)}`,
  },
}

const { ThemeProvider, useTheme } = createTheming(themes.default)

export { ThemeProvider, useTheme, themes }
