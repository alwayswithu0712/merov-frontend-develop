module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['airbnb/base', 'plugin:react/recommended', 'prettier', 'prettier/react'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        JSX: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        // indent: ['error', 4],
        // 'react/jsx-indent': ['error', 4],
        // 'react/jsx-indent-props': ['error', 4],
        'consistent-return': 'off',
        'no-nested-ternary': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: ['**/*.stories.*', '**/.storybook/**/*.*'],
                peerDependencies: true,
            },
        ],
        'react/react-in-jsx-scope': [0],
        'react/prop-types': [0],
        'react/no-array-index-key': [0],
        'react/forbid-prop-types': [0],
        'react/no-danger': [0],
        'react/require-default-props': [0],
        'no-shadow': [0],

        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
        // [Deprecated], https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md

        'react/jsx-props-no-spreading': [0],
        // 'react/jsx-fragments': ['error', 'element'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        'import/prefer-default-export': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                mjs: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'max-len': [
            'error',
            140,
            2,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'prettier/prettier': 1,
        'no-use-before-define': 'off',
        'prefer-destructuring': [
            'error',
            {
                array: false,
                object: false,
            },
        ],
    },
};
