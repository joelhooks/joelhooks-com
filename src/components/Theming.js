import { createTheming } from '@callstack/react-theme-provider'

const colors = {
  black: '#131415',
  white: '#fff',
  pink: '#ff1493',
  gray: '#dedede',
}

const themes = {
  default: {
    themeName: 'default',
    colors: {
      primary: colors.pink,
      bodyColor: colors.black,
      bodyBg: colors.white,
      ...colors,
    },
  },
  dark: {
    themeName: 'dark',
    colors: {
      primary: colors.pink,
      bodyColor: colors.white,
      bodyBg: colors.black,
      ...colors,
    },
  },
}

const { ThemeProvider, useTheme } = createTheming(themes.default)

export { ThemeProvider, useTheme, themes }
