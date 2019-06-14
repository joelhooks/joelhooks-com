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
      text: colors.black,
      body: colors.white,
      ...colors,
    },
  },
  dark: {
    themeName: 'dark',
    colors: {
      primary: colors.pink,
      text: colors.white,
      body: colors.black,
      ...colors,
    },
  },
}

const { ThemeProvider, useTheme } = createTheming(themes.default)

export { ThemeProvider, useTheme, themes }
