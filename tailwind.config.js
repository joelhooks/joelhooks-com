module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '545px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1920px',
    },
    colors: {
      black: 'var(--color-black)',
      white: 'var(--color-white)',
      pink: 'var(--color-pink)',
      gray: 'var(--color-gray)',
      primary: 'var(--color-primary)',
    },
    textColor: {
      'body-color': 'var(--color-body-color)',
    },
    backgroundColor: {
      'body-bg': 'var(--color-body-bg)',
    },
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
