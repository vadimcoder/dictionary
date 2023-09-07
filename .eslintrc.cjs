module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ["compiled"],
  parser: "@typescript-eslint/parser",

  // disable the rule from plugin:react/recommended "ESLint: 'React' must be in scope when using JSX(react/react-in-jsx-scope)"
  // because React doesn't require it since v.17
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  }
}
