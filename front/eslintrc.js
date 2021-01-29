module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  //plugins: ['react-hooks'],
  rules: {
    // 추후 .prettierrc.js 파일에서 설정해줄 예정
    //'react-hooks/rules-of-hooks': 'error',
    //'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
