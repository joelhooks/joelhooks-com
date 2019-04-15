import React from 'react'

const ThemeToggler = ({ toggleTheme, themeName }) => (
  <button
    onClick={() => toggleTheme(themeName === 'dark' ? 'default' : 'dark')}
  >
    {themeName === 'dark' ? 'default' : 'dark'}
  </button>
)

export default ThemeToggler
