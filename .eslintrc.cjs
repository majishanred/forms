module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "plugin:@web-bee-ru/base",
    "plugin:@web-bee-ru/react",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'eslint-plugin-react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
