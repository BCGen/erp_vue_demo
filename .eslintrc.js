module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    $: 'readonly',
    moment: 'readonly'
  },
  extends: [
    // 'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/prettier'
    // 'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': 'warn',
    'vue/no-unused-components': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-parsing-error': 'off',
    'no-empty': 'warn',
    'no-unused-vars': 'warn',
    'vue/no-v-html': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
