module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['src/migrations/', 'src/assets'],
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 120,
        endOfLine: 'auto',
        arrowParens: 'avoid',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
  },
};
