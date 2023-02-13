/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    // REACT
    'jsx-a11y',
    'react',
    'react-hooks',
  ],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['external', 'builtin', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      },
    ],
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/prefer-reduce-type-parameter': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-invalid-this': 'off',
    '@typescript-eslint/init-declarations': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    '@typescript-eslint/default-param-last': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/unified-signatures': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/prefer-for-of': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/generic-type-naming': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/typedef': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-untyped-public-signature': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/no-console': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/arrow-body-style': 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/operator-linebreak': 'off',
    '@typescript-eslint/no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 'off',
    '@typescript-eslint/object-curly-newline': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-extra-parens': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'prefer-const': 'error',
    'func-names': ['error', 'never'],
    'wrap-iife': ['error', 'any'],
    'no-extra-boolean-cast': 'off',
    'linebreak-style': 'off',
    curly: ['error', 'all'],

    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 150,
        arrowParens: 'avoid',
        endOfLine: 'auto',
        tabWidth: 2,
      },
    ],
    'ban-ts-comment': 'off',

    // REACT
    '@typescript-eslint/ban-types': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-boolean-value': 'off',
    'react/forbid-prop-types': 'off',
    'react/prefer-stateless-function': 'off',
    'react/destructuring-assignment': 'error',
    'react/default-props-match-prop-types': [
      'error',
      {
        allowRequiredDefaults: true,
      },
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/sort-comp': [
      1,
      {
        order: ['static-methods', 'static-variables', 'instance-variables', 'type-annotations', 'lifecycle', 'everything-else', 'render'],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'state',
            'getInitialState',
            'getChildContext',
            'getDerivedStateFromProps',
            'getDerivedStateFromError',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
        },
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-useless-escape': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/promise-function-async': 'off',
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  ],
  ignorePatterns: ['**/*.css', '**/*.scss', '**/*.md', '**/*.js', '**/*.svg', '**/*.html'],
};
