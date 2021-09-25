module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["plugin:vue/essential"],
  parser: "vue-eslint-parser",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    parser: 'babel-eslint'
  },
  rules: {
    "no-unused-vars": 0,
    'no-console': 'off',
  },
}