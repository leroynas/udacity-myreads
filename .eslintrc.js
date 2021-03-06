module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": 0,
    "implicit-arrow-linebreak": 0,
    "no-param-reassign": ["error", { "props": false }]
  },
};
