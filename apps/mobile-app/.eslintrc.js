// eslint.config.cjs
const reactPlugin = require("eslint-plugin-react");
const rnPlugin = require("eslint-plugin-react-native");
const unusedImports = require("eslint-plugin-unused-imports");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
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
      react: reactPlugin,
      "react-native": rnPlugin,
      "unused-imports": unusedImports,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "react-native/split-platform-components": "warn",
      "@typescript-eslint/no-unused-vars": "error",
    },
    settings: {
      react: { version: "detect" },
    },
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
