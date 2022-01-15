module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: 'eslint:recommended',
  globals: {
    __dirname: 'writeable',
    logger: 'readonly',
    CONFIG: 'readonly',
    process: 'readonly',
    cache: 'readonly'
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018
  },
  rules: {
    'semi': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'comma-dangle': ['error', 'never'],
    'quotes': ['error', 'single'],
    'spaced-comment': ['error', 'always'],
    'no-dupe-keys': ['off']
  }
}