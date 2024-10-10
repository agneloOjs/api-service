export default {
    env: {
      browser: true,
      es2021: true,
      jest: true,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module",
    },
    rules: {
      "no-undef": "off",
    },
  };