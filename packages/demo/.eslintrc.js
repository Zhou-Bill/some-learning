module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  plugins: ['eslint-plugin-sentry'],
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'sentry/sentry-capture-exception': 'error'
  }
}
