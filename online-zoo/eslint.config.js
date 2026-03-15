import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslint from "@eslint/js";
import globals from "globals";

export default [
  eslint.configs.recommended,
  {
    ignores: ["node_modules", "dist", "build"],
    files: ["**/*.ts"],
    languageOptions: { 
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      // Вот так ПРАВИЛЬНО подключается весь пакет рекомендованных правил:
      ...tsPlugin.configs.recommended.rules, 
      
      // А ниже идут уже твои точечные настройки конкретных правил:
      "multiline-comment-style": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "no-unused-expressions": "off",
    },
  },
];