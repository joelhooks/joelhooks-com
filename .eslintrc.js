module.exports = {
  extends: ['prettier'],
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': '2',
    'react-hooks/exhaustive-deps': '1',
    // react plugin - options
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
}
