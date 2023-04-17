module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:nuxt/recommended', 'prettier'],
  parserOptions: {
    requireConfigFile: false,
  },
  plugins: [],
  rules: {
    semi: [2, 'never'],
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-sparse-arrays': 'off',
    'array-callback-return': 0,
    'import/no-named-as-default': 0,
    'import/named': 0,
    // vue settings
    'vue/script-setup-uses-vars': 0,
    'vue/attribute-hyphenation': 0,
    'vue/no-v-html': 0,
    'vue/multi-word-component-names': 0,
    // 'vue/html-self-closing': [
    //   'error',
    //   {
    //     html: {
    //       void: 'always',
    //     },
    //   },
    // ],
    'vue/html-closing-bracket-newline': 'off',
    // nuxt settings
    'nuxt/no-globals-in-created': 0,
    'nuxt/no-env-in-hooks': 0,
    'no-useless-constructor': 'off',
    'node/no-missing-import': 'off',
  },
  settings: {
    node: {
      allowModules: ['electron'],
      resolvePaths: [__dirname],
      tryExtensions: ['.js', '.json', '.node'],
    },
  },
}
