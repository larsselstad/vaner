import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { ignores: ['amplify/auth/post-confirmation/graphql/*.ts'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginReactRefresh.configs.recommended,
    {
        plugins: { 'react-hooks': pluginReactHooks },
        rules: { ...pluginReactHooks.configs.recommended.rules }
    },
    { settings: { react: { version: 'detect' } } }
];
