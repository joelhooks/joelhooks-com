import React from 'react'

const ThemeToggler = ({ toggleTheme, themeName }) => (
  <button
    style={{ width: '100px' }}
    onClick={() => toggleTheme(themeName === 'dark' ? 'default' : 'dark')}
  >
    {themeName === 'dark' ? 'default' : 'dark'}
  </button>
)

export default ThemeToggler
