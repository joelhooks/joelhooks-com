import React from 'react'
import Button from './Button'

const ThemeToggler = ({ toggleTheme, themeName }) => (
  <Button
    css={{ position: 'fixed', right: '10vw' }}
    onClick={() => toggleTheme(themeName === 'dark' ? 'default' : 'dark')}
  >
    {themeName === 'dark' ? 'light' : 'dark'}
  </Button>
)

export default ThemeToggler
