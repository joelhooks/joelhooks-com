import { createTheming } from '@callstack/react-theme-provider'
import { darken, lighten, rgba } from 'polished'

const colorConsts = {
  primaryDefault: '#ff4094',
  primaryDark: '#333333',
  secondaryDefault: '#eef4f2',
  secondaryDark: '#888888',
}

const colors = {
  black: '#000',
  white: '#fff',
}

const themes = {
  default: {
    themeName: 'default',
    primary: colorConsts.primaryDefault,
    primaryLight: lighten(0.33, colorConsts.primaryDefault),
    secondary: colorConsts.secondaryDefault,
    textColor: rgba(colors.black, 0.85),
    link: colorConsts.primaryDefault,
    linkHover: darken(0.07, colorConsts.primaryDefault),
    ...colors,
  },
  dark: {
    themeName: 'dark',
    primary: colorConsts.primaryDark,
    primaryLight: lighten(0.33, colorConsts.primaryDark),
    secondary: colorConsts.secondaryDark,
    text: rgba(colors.black, 0.85),
    link: colorConsts.primaryDark,
    linkHover: `${darken(0.07, colorConsts.primaryDark)}`,
    ...colors,
  },
}

const { ThemeProvider, useTheme } = createTheming(themes.default)

export { ThemeProvider, useTheme, themes }
