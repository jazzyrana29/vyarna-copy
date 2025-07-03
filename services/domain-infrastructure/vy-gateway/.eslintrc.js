// eslint.config.cjs
const unusedImports = require("eslint-plugin-unused-imports");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules/**", "babel.config.js", "metro.config.js"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "unused-imports": unusedImports,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
    },
    settings: {},
  },
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
];
