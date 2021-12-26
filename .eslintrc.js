module.exports = {
  root: true,

  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],

  plugins: [
    'sort-imports-es6-autofix'
  ],

  parserOptions: {
    ecmaVersion: 2020
  },

  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    camelcase: 0,
    'no-new': 0,
    'brace-style': 0,
    'arrow-parens': 0,
    'no-return-await': 0,
    'no-return-assign': 0,
    'new-cap': 0,
    'import/no-absolute-path': 0,
    'no-console': 0,
    'no-sequences': 0,
    'no-use-before-define': 0,
    'sort-imports-es6-autofix/sort-imports-es6': ['error', {
      ignoreCase: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple']
    }],
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'operator-linebreak': ['error', 'before'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase']
  },

  overrides: [
    {
      files: [
        '**/*.vue'
      ],
      rules: {
        'no-undef': 0
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
