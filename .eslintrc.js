module.exports = {
  extends: ['lark'],
  rules: {
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
  },
  globals: {
    __DEV__: true,
    __webpack_public_path__: true,
    __APP_LOADED__: true,
    eruda: true,
    SENTRY_DSN: true,
    APP_ENV: true,
    SENTRY_RELEASE: true,
    VERSION: true,
  },
}
